import { Request, Response } from 'express';
import { sequelize } from '../model/index';
import { getKeycloakAdmin } from '../keycloak-api';
import { checkLogin } from '../makkelijkemarkt-api';
import { internalServerErrorPage } from '../express-util';
import { getTimezoneTime } from '../util';

// This health check page is required for Docker deployments
export const serverHealth = (req: Request, res: Response) => {
    res.end('OK!');
};

// This health check page is required for Docker deployments
export const serverTime = (req: Request, res: Response) => {
    res.end( String(getTimezoneTime()) );
};

export const databaseHealth = (req: Request, res: Response) => {
    sequelize
        .authenticate()
        .then(() => {
            res.end('Database OK!');
        })
        .catch((err: Error) => {
            internalServerErrorPage(res)('Unable to connect to the database');
        });
};

export const keycloakHealth = (req: Request, res: Response) => {
    getKeycloakAdmin()
        .then(kcAdminClient =>
            kcAdminClient.realms.findOne({
                realm: process.env.IAM_REALM,
            }),
        )
        .then(() => {
            res.end('Keycloak OK!');
        })
        .catch((err: Error) => {
            internalServerErrorPage(res)('Unable to connect to the Keycloak');
        });
};

export const makkelijkeMarktHealth = (req: Request, res: Response) => {
    checkLogin()
        .then(() => {
            res.end('Makkelijke Markt API OK!');
        })
        .catch((err: Error) => {
            internalServerErrorPage(res)('Unable to connect to Makkelijke Markt API');
        });
};
