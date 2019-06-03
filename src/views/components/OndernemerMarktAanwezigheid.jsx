import Button from './Button';
import OndernemerMarktHeading from './OndernemerMarktHeading';
import PropTypes from 'prop-types';
import React from 'react';

const { formatDayOfWeek } = require('../../util.js');

const OndernemerMarktAanwezigheid = ({ markt, rsvpEntries, sollicitatie, ondernemer }) => {
    return (
        <div className="OndernemerMarktAanwezigheid">
            <OndernemerMarktHeading markt={markt} sollicitatie={sollicitatie} />
            <ul className="OndernemerMarktAanwezigheid__list">
                {rsvpEntries.map(({ date, rsvp, index }) => {
                    const attending = rsvp
                        ? rsvp.attending
                        : sollicitatie.status === 'vkk' || sollicitatie.status === 'vpl';

                    return (
                        <li
                            key={date}
                            className={`OndernemerMarktAanwezigheid__list-item OndernemerMarktAanwezigheid__list-item--${
                                attending ? 'attending' : 'not-attending'
                            }`}
                        >
                            {attending ? (
                                <span className="OndernemerMarktAanwezigheid__list-item-wrapper">
                                    <span>
                                        Ik kom <strong>{formatDayOfWeek(date)}</strong>
                                    </span>
                                    <span>{date}</span>
                                </span>
                            ) : (
                                <span className="OndernemerMarktAanwezigheid__list-item-wrapper">
                                    <span>
                                        Ik kom niet <strong>{formatDayOfWeek(date)}</strong>
                                    </span>
                                    <span>{date}</span>
                                </span>
                            )}
                        </li>
                    );
                })}
            </ul>
            <Button
                label="Wijziging doorgeven"
                href={`/afmelden/${ondernemer.erkenningsnummer}/${markt.id}/?next=/dashboard/${
                    ondernemer.erkenningsnummer
                }/#markt-${markt.id}`}
            />
        </div>
    );
};

OndernemerMarktAanwezigheid.propTypes = {
    markt: PropTypes.object,
    sollicitatie: PropTypes.object,
    ondernemer: PropTypes.object,
    rsvpEntries: PropTypes.array,
};

module.exports = OndernemerMarktAanwezigheid;