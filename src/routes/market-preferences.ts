import { NextFunction, Request, Response } from 'express';
import { IMarktondernemerVoorkeurRow } from '../markt.model';
import { upsert } from '../sequelize-util.js';
import models from '../model/index';
import { internalServerErrorPage, HTTP_CREATED_SUCCESS, getQueryErrors } from '../express-util';
import { getMarkt, getOndernemer } from '../makkelijkemarkt-api';
import { getAllBranches } from '../pakjekraam-api';

import { Voorkeur } from '../model/voorkeur.model';
import { voorkeurenFormData } from '../model/voorkeur.functions';

import moment from 'moment';
import { getKeycloakUser } from '../keycloak-api';
import { GrantedRequest } from 'keycloak-connect';

export const algemeneVoorkeurenFormCheckForError = (body: any, role: string) => {

    let error = null;

    if (role === 'marktmeester') {
        const { absentFrom, absentUntil } = body;
        if (absentUntil) {
            if ( !moment(absentUntil, 'DD-MM-YYYY', true).isValid()) {
                error = 'Datum afwezigheid vanaf heeft niet het juiste format. Gebruik dd-mm-yyyy.';
            }
        }
        if (absentFrom) {
            if ( !moment(absentFrom, 'DD-MM-YYYY',true).isValid()) {
                error = 'Datum afwezigheid tot en met heeft niet het juiste format. Gebruik dd-mm-yyyy.';
            }
        }
    }

    return error;
};

export const updateMarketPreferences = (req: Request, res: Response, next: NextFunction, erkenningsNummer: string, role: string) => {

    const data = voorkeurenFormData(req.body);
    const formError = algemeneVoorkeurenFormCheckForError(req.body, role);

    if (formError !== null) {
        return res.redirect(`./?error=${formError}`);
    }

    const { marktId } = data;

    upsert(
        models.voorkeur,
        {
            erkenningsNummer,
            marktId,
        },
        data,
    ).then(
        () => res.status(HTTP_CREATED_SUCCESS).redirect(req.body.next ? req.body.next : '/'),
        internalServerErrorPage(res),
    );
};

export const marketPreferencesPage = (
    req: GrantedRequest,
    res: Response,
    erkenningsNummer: string,
    marktId: string,
    role: string,
    csrfToken: string,
) => {

    const messages = getQueryErrors(req.query);
    const ondernemerPromise = getOndernemer(erkenningsNummer);
    const marktPromise = marktId ? getMarkt(marktId) : Promise.resolve(null);

    // TODO: Only allow relative URLs in `next`, to prevent redirection to 3rd party phishing sites
    const next = req.query.next;
    const query = req.query;

    Promise.all([
        ondernemerPromise,
        marktPromise,
        Voorkeur.findOne({
            where: { erkenningsNummer, marktId },
            raw: true
        }),
        getAllBranches(),
    ]).then(([ondernemer, markt, voorkeur, branches]) => {
        res.render('AlgemeneVoorkeurenPage', {
            ondernemer,
            markt,
            marktId,
            voorkeur,
            branches,
            next,
            query,
            messages,
            role,
            csrfToken,
            user: getKeycloakUser(req)
        });

    }, internalServerErrorPage(res));
};
