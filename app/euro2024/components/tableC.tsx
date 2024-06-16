'use client'
import React, { useState, useEffect } from 'react';
import Match from './defaultmatch';
import FinalTable from './finaltable';
import { Team } from './types';

interface TableAProps {
    onTeamsUpdate: (teams: Team[]) => void;
}

export default function TableC({ onTeamsUpdate }: TableAProps) {
    const [points, setPoints] = useState<{ [key: string]: { team1Points: number, team2Points: number, team1GoalsDone: number, team2GoalsDone: number } }>({});
    const teams: Team[] = [
        { name: 'Slovenia', points: calculatePoints('Slovenia'), goals_done: calculateGoalsDone('Slovenia'), goals_left: calculateGoalsLeft('Slovenia') },
        { name: 'Denmark', points: calculatePoints('Denmark'), goals_done: calculateGoalsDone('Denmark'), goals_left: calculateGoalsLeft('Denmark') },
        { name: 'Serbia', points: calculatePoints('Serbia'), goals_done: calculateGoalsDone('Serbia'), goals_left: calculateGoalsLeft('Serbia') },
        { name: 'England', points: calculatePoints('England'), goals_done: calculateGoalsDone('England'), goals_left: calculateGoalsLeft('England') },
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
        <main id="TableC" className="flex min-h-screen flex-col items-center justify-center bg-white">
            <Match
                city="Stuttgart"
                date="Su 16.06.2024"
                time="18:00"
                team1="Slovenia"
                team2="Denmark"
                size="xs"
                onPointsChange={(team1Points, team2Points, team1GoalsDone, team2GoalsDone) => handlePointsChange('Slovenia;Denmark', team1Points, team2Points, team1GoalsDone, team2GoalsDone)}
            />
            <Match
                city="Gelsenkirchen"
                date="Su 16.06.2024"
                time="21:00"
                team1="Serbia"
                team2="England"
                size="xs"
                onPointsChange={(team1Points, team2Points, team1GoalsDone, team2GoalsDone) => handlePointsChange('Serbia;England', team1Points, team2Points, team1GoalsDone, team2GoalsDone)}
            />
            <Match
                city="Munich"
                date="Th 20.06.2024"
                time="15:00"
                team1="Slovenia"
                team2="Serbia"
                size="xs"
                onPointsChange={(team1Points, team2Points, team1GoalsDone, team2GoalsDone) => handlePointsChange('Slovenia;Serbia', team1Points, team2Points, team1GoalsDone, team2GoalsDone)}
            />
            <Match
                city="Frankfurt"
                date="Th 20.06.2024"
                time="18:00"
                team1="Denmark"
                team2="England"
                size="xs"
                onPointsChange={(team1Points, team2Points, team1GoalsDone, team2GoalsDone) => handlePointsChange('Denmark;England', team1Points, team2Points, team1GoalsDone, team2GoalsDone)}
            />
            <Match
                city="Cologne"
                date="Tu 25.06.2024"
                time="21:00"
                team1="England"
                team2="Slovenia"
                size="xs"
                onPointsChange={(team1Points, team2Points, team1GoalsDone, team2GoalsDone) => handlePointsChange('England;Slovenia', team1Points, team2Points, team1GoalsDone, team2GoalsDone)}
            />
            <Match
                city="Munich"
                date="Tu 25.06.2024"
                time="21:00"
                team1="Denmark"
                team2="Serbia"
                size="xs"
                onPointsChange={(team1Points, team2Points, team1GoalsDone, team2GoalsDone) => handlePointsChange('Denmark;Serbia', team1Points, team2Points, team1GoalsDone, team2GoalsDone)}
            />
            <div className="final-table-wrapper">
                <FinalTable teams={teams} group='C' />
            </div>
        </main>
    );
}
