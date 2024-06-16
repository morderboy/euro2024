'use client'
import React, { useState, useEffect } from 'react';
import Match from './defaultmatch';
import FinalTable from './finaltable';
import { Team } from './types';

interface TableAProps {
    onTeamsUpdate: (teams: Team[]) => void;
}

export default function TableB({ onTeamsUpdate }: TableAProps) {
    const [points, setPoints] = useState<{ [key: string]: { team1Points: number, team2Points: number, team1GoalsDone: number, team2GoalsDone: number } }>({});
    const teams: Team[] = [
        { name: 'Poland', points: calculatePoints('Poland'), goals_done: calculateGoalsDone('Poland'), goals_left: calculateGoalsLeft('Poland') },
        { name: 'Netherlands', points: calculatePoints('Netherlands'), goals_done: calculateGoalsDone('Netherlands'), goals_left: calculateGoalsLeft('Netherlands') },
        { name: 'Austria', points: calculatePoints('Austria'), goals_done: calculateGoalsDone('Austria'), goals_left: calculateGoalsLeft('Austria') },
        { name: 'France', points: calculatePoints('France'), goals_done: calculateGoalsDone('France'), goals_left: calculateGoalsLeft('France') },
    ];

    useEffect(() => {
        onTeamsUpdate(teams);
    }, [points]); // Обновляем команды при изменении очков

    const handlePointsChange = (matchKey: string, team1Points: number, team2Points: number, team1GoalsDone: number, team2GoalsDone: number) => {
        setPoints(prevPoints => ({
            ...prevPoints,
            [matchKey]: { team1Points, team2Points, team1GoalsDone, team2GoalsDone },
        }));
    };

    function calculatePoints(team: string): number {
        let teamPoints = 0;

        Object.entries(points).forEach(([matchKey, { team1Points, team2Points }]) => {
            const [team1, team2] = matchKey.split(';');

            if (team === team1) {
                if (team1Points > team2Points) teamPoints += 3;
                else if (team1Points === team2Points) teamPoints += 1;
            } else if (team === team2) {
                if (team2Points > team1Points) teamPoints += 3;
                else if (team1Points === team2Points) teamPoints += 1;
            }
        });

        return teamPoints;
    }

    function calculateGoalsDone(team: string): number {
        let goalsDone = 0;

        Object.entries(points).forEach(([matchKey, { team1GoalsDone, team2GoalsDone }]) => {
            const [team1, team2] = matchKey.split(';');

            if (team === team1) {
                goalsDone += team1GoalsDone;
            } else if (team === team2) {
                goalsDone += team2GoalsDone;
            }
        });

        return goalsDone;
    }

    function calculateGoalsLeft(team: string): number {
        let goalsLeft = 0;

        Object.entries(points).forEach(([matchKey, { team1GoalsDone, team2GoalsDone }]) => {
            const [team1, team2] = matchKey.split(';');

            if (team === team1) {
                goalsLeft += team2GoalsDone;
            } else if (team === team2) {
                goalsLeft += team1GoalsDone;
            }
        });

        return goalsLeft;
    }

    return (
        <main id="TableD" className="flex min-h-screen flex-col items-center justify-center bg-white">
            <Match
                city="Hamburg"
                date="Su 16.06.2024"
                time="15:00"
                team1="Poland"
                team2="Netherlands"
                size="xs"
                onPointsChange={(team1Points, team2Points, team1GoalsDone, team2GoalsDone) => handlePointsChange('Poland;Netherlands', team1Points, team2Points, team1GoalsDone, team2GoalsDone)}
            />
            <Match
                city="Dusseldorf"
                date="Mo 17.06.2024"
                time="21:00"
                team1="Austria"
                team2="France"
                size="xs"
                onPointsChange={(team1Points, team2Points, team1GoalsDone, team2GoalsDone) => handlePointsChange('Austria;France', team1Points, team2Points, team1GoalsDone, team2GoalsDone)}
            />
            <Match
                city="Berlin"
                date="Fr 21.06.2024"
                time="18:00"
                team1="Poland"
                team2="Austria"
                size="xs"
                onPointsChange={(team1Points, team2Points, team1GoalsDone, team2GoalsDone) => handlePointsChange('Poland;Austria', team1Points, team2Points, team1GoalsDone, team2GoalsDone)}
            />
            <Match
                city="Leipzig"
                date="Fr 21.06.2024"
                time="21:00"
                team1="Netherlands"
                team2="France"
                size="xs"
                onPointsChange={(team1Points, team2Points, team1GoalsDone, team2GoalsDone) => handlePointsChange('Netherlands;France', team1Points, team2Points, team1GoalsDone, team2GoalsDone)}
            />
            <Match
                city="Berlin"
                date="Tu 25.06.2024"
                time="18:00"
                team1="Netherlands"
                team2="Austria"
                size="xs"
                onPointsChange={(team1Points, team2Points, team1GoalsDone, team2GoalsDone) => handlePointsChange('Netherlands;Austria', team1Points, team2Points, team1GoalsDone, team2GoalsDone)}
            />
            <Match
                city="Dortmund"
                date="Tu 25.06.2024"
                time="18:00"
                team1="France"
                team2="Poland"
                size="xs"
                onPointsChange={(team1Points, team2Points, team1GoalsDone, team2GoalsDone) => handlePointsChange('France;Poland', team1Points, team2Points, team1GoalsDone, team2GoalsDone)}
            />
            <div className="final-table-wrapper">
                <FinalTable teams={teams} group='D' />
            </div>
        </main>
    );
}