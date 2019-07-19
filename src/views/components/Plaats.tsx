import * as React from 'react';
import OndernemerStatus from './OndernemerStatus.jsx';
import PrintableBackground from './PrintableBackground.jsx';
import PropTypes from 'prop-types';
import { IMarktplaats, IMarktondernemer, IRSVP, IToewijzing } from '../../markt.model';

const Plaats = ({
    plaats,
    vph,
    ondernemer,
    first,
    aanmelding,
    toewijzing,
}: {
    plaats: IMarktplaats;
    vph?: IMarktondernemer;
    ondernemer?: IMarktondernemer;
    first?: boolean;
    aanmelding?: IRSVP;
    toewijzing?: IToewijzing;
}) => {
    const colorList: { [index: string]: string } = {
        'branche-vis': '#343797',
        vis: '#343797',
        'branche-natte-vis': '#CEFFFF',
        'natte-vis': '#CEFFFF',
        'branche-kip': '#9ACA27',
        kip: '#9ACA27',
        'branche-agf': '#2BB527',
        agf: '#2BB527',
        'exo-groente': '#2BB527',
        'streek-groente': '#2BB527',
        kas: '#2BB527',
        blm: '#6bb592',
        bloemen: '#6bb592',
        'experimentele-zone': '#9BCDFD',
        exp: '#9BCDFD',
        zui: '#825ffd',
        'kaas-zuivel': '#825ffd',
        kaas: '#825ffd',
        'branche-bak': '#FD9BCB',
        bak: '#FD9BCB',
        patat: '#FD9BCB',
        baks7: '#FD9BCB',
        baks6: '#FD9BCB',
        baks5: '#FD9BCB',
        baks4: '#FD9BCB',
        'gebakken-vis': '#FD9BCB',
        olv: '#FD9BCB',
        noten: '#FD9BCB',
        snacks: '#FD9BCB',
        bakker: '#FD9BCB',
        'snacks-loempia': '#FD9BCB',
        standwerkersplaats: '#FBF136',
        brc: '#C0C0C0',
        food: '#C0C0C0',
        keukenartikelen: '#C0C0C0',
        borstel: '#C0C0C0',
        dameskleding: '#C0C0C0',
        'nacht-en-ondermode': '#C0C0C0',
        horloges: '#C0C0C0',
        modestoffen: '#C0C0C0',
        sieraden: '#C0C0C0',
        drogisterij: '#C0C0C0',
        beenmode: '#C0C0C0',
        tapijten: '#C0C0C0',
        babykleding: '#C0C0C0',
        schoenen: '#C0C0C0',
        tassen: '#C0C0C0',
        stn: '#C0C0C0',
        promo: '#C0C0C0',
        'eigen-materiaal': '#C0C0C0',
        'kraam-8-meter': '#ff7700',
    };

    let plaatsProps = plaats.properties || [],
        tags = plaats.properties || [];
    const branches = plaats.branches || [];

    plaatsProps = plaatsProps.filter(word => !['dubble'].includes(word));
    plaatsProps.reverse();
    tags = tags.filter(word => ['experimentele-zone', 'standwerkersplaats', 'eigen-materiaal'].includes(word));

    let color = Object.keys(colorList).find(key => {
        return tags.length && key === tags[0].trim();
    });

    color = branches.length
        ? colorList[branches[branches.length - 1]]
            ? colorList[branches[branches.length - 1]]
            : '#5D4211'
        : undefined;

    return (
        <tr
            className={`
                Plaats ${first && 'Plaats--first'} ${tags.join(' ')} ${
                aanmelding ? ' Plaats--vph-attendance-verified' : ''
            }${
                aanmelding && aanmelding.attending !== null && !aanmelding.attending
                    ? ' Plaats--vph-attendance-not-attending'
                    : ''
            }`}
            data-sollicitatie-nummer={vph && vph.sollicitatieNummer}
        >
            <td className="Plaats__prop Plaats__prop-properties">
                <span className={`icon icon-${plaatsProps ? plaatsProps[0] : ''}`} />
            </td>
            <td className="Plaats__prop Plaats__prop-plaats-nr">
                {plaats.plaatsId}
                {color && <PrintableBackground color={color} />}
            </td>

            <td className="Plaats__prop Plaats__prop-soll Plaats__prop-vph">
                <span id={`soll-${vph && vph.sollicitatieNummer}`} />
                {vph ? (
                    <a href={`/profile/${vph.erkenningsNummer}`}>
                        <strong>{vph.sollicitatieNummer}</strong>
                    </a>
                ) : null}
            </td>
            <td className="Plaats__prop Plaats__prop-naam Plaats__prop-vph-description">
                {vph ? vph.description : <strong>{tags.join(' ')}</strong>}
            </td>
            <td className="Plaats__prop Plaats__prop-soll">
                {ondernemer ? (
                    <a href={`/profile/${toewijzing.erkenningsNummer}`}>
                        <strong>{ondernemer.sollicitatieNummer}</strong>
                    </a>
                ) : null}
            </td>
            <td className="Plaats__prop Plaats__prop-naam">{ondernemer ? ondernemer.description : null}</td>
            <td className="Plaats__prop Plaats__prop-status">
                {ondernemer ? <OndernemerStatus status={ondernemer.status} size="s" /> : null}
            </td>
        </tr>
    );
};

Plaats.propTypes = {
    plaats: PropTypes.object.isRequired,
    ondernemer: PropTypes.object,
    vph: PropTypes.object,
    first: PropTypes.bool,
    aanmelding: PropTypes.object,
    toewijzing: PropTypes.object,
};

export default Plaats;