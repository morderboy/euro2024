import React from 'react';

interface CountryFlagProps {
  team: string;
}

export default function CountryFlag(team: CountryFlagProps) {
    const teamFlags: { [key: string]: string } = {
        'Germany': 'https://hatscripts.github.io/circle-flags/flags/de.svg',
        'Scotland': 'https://hatscripts.github.io/circle-flags/flags/gb.svg',
        'Hungary': 'https://hatscripts.github.io/circle-flags/flags/hu.svg',
        'Switzerland': 'https://hatscripts.github.io/circle-flags/flags/ch.svg',
        'Spain': 'https://hatscripts.github.io/circle-flags/flags/es.svg',
        'Croatia': 'https://hatscripts.github.io/circle-flags/flags/hr.svg',
        'Italy': 'https://hatscripts.github.io/circle-flags/flags/it.svg',
        'Albania': 'https://hatscripts.github.io/circle-flags/flags/al.svg',
        'Slovenia': 'https://hatscripts.github.io/circle-flags/flags/si.svg',
        'Denmark': 'https://hatscripts.github.io/circle-flags/flags/dk.svg',
        'Serbia': 'https://hatscripts.github.io/circle-flags/flags/rs.svg',
        'England': 'https://hatscripts.github.io/circle-flags/flags/gb-eng.svg',
        'Poland': 'https://hatscripts.github.io/circle-flags/flags/pl.svg',
        'Netherlands': 'https://hatscripts.github.io/circle-flags/flags/nl.svg',
        'Austria': 'https://hatscripts.github.io/circle-flags/flags/at.svg',
        'France': 'https://hatscripts.github.io/circle-flags/flags/fr.svg',
        'Romania': 'https://hatscripts.github.io/circle-flags/flags/ro.svg',
        'Ukraine': 'https://hatscripts.github.io/circle-flags/flags/ua.svg',
        'Belgium': 'https://hatscripts.github.io/circle-flags/flags/be.svg',
        'Slovakia': 'https://hatscripts.github.io/circle-flags/flags/sk.svg',
        'Turkiye': 'https://hatscripts.github.io/circle-flags/flags/tr.svg',
        'Georgia': 'https://hatscripts.github.io/circle-flags/flags/ge.svg',
        'Portugal': 'https://hatscripts.github.io/circle-flags/flags/pt.svg',
        'Czechia': 'https://hatscripts.github.io/circle-flags/flags/cz.svg'
    };

    const getFlagUrl = (team: string) => {
        return teamFlags[team] || ''; // Default flag if team is not found
    };

    return (
        <img
        src={getFlagUrl(team.team)}
        alt={`${team.team} Flag`}
        className="inline-block w-4 h-4 ml-2"
        />
    );
};
