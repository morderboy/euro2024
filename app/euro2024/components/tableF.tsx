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
        { name: 'Turkiye', points: calculatePoints('Turkiye'), goals_done: calculateGoalsDone('Turkiye'), goals_left: calculateGoalsLeft('Turkiye') },
        { name: 'Georgia', points: calculatePoints('Georgia'), goals_done: calculateGoalsDone('Georgia'), goals_left: calculateGoalsLeft('Georgia') },
        { name: 'Portugal', points: calculatePoints('Portugal'), goals_done: calculateGoalsDone('Portugal'), goals_left: calculateGoalsLeft('Portugal') },
        { name: 'Czechia', points: calculatePoints('Czechia'), goals_done: calculateGoalsDone('Czechia'), goals_left: calculateGoalsLeft('Czechia') },
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
        <main id="TableF" className="flex min-h-screen flex-col items-center justify-center bg-white">
            <Match
                city="Dortmund"
                date="Tu 18.06.2024"
                time="18:00"
                team1="Turkiye"
                team2="Georgia"
                size="xs"
                onPointsChange={(team1Points, team2Points, team1GoalsDone, team2GoalsDone) => handlePointsChange('Turkiye;Georgia', team1Points, team2Points, team1GoalsDone, team2GoalsDone)}
            />
            <Match
                city="Leipzig"
                date="Tu 18.06.2024"
                time="21:00"
                team1="Portugal"
                team2="Czechia"
                size="xs"
                onPointsChange={(team1Points, team2Points, team1GoalsDone, team2GoalsDone) => handlePointsChange('Portugal;Czechia', team1Points, team2Points, team1GoalsDone, team2GoalsDone)}
            />
            <Match
                city="Hamburg"
                date="Sa 22.06.2024"
                time="15:00"
                team1="Georgia"
                team2="Czechia"
                size="xs"
                onPointsChange={(team1Points, team2Points, team1GoalsDone, team2GoalsDone) => handlePointsChange('Georgia;Czechia', team1Points, team2Points, team1GoalsDone, team2GoalsDone)}
            />
            <Match
                city="Dortmund"
                date="Sa 22.06.2024"
                time="18:00"
                team1="Turkiye"
                team2="Portugal"
                size="xs"
                onPointsChange={(team1Points, team2Points, team1GoalsDone, team2GoalsDone) => handlePointsChange('Turkiye;Portugal', team1Points, team2Points, team1GoalsDone, team2GoalsDone)}
            />
            <Match
                city="Gelsenkirchen"
                date="We 26.06.2024"
                time="21:00"
                team1="Georgia"
                team2="Portugal"
                size="xs"
                onPointsChange={(team1Points, team2Points, team1GoalsDone, team2GoalsDone) => handlePointsChange('Georgia;Portugal', team1Points, team2Points, team1GoalsDone, team2GoalsDone)}
            />
            <Match
                city="Hamburg"
                date="We 26.06.2024"
                time="21:00"
                team1="Czechia"
                team2="Turkiye"
                size="xs"
                onPointsChange={(team1Points, team2Points, team1GoalsDone, team2GoalsDone) => handlePointsChange('Czechia;Turkiye', team1Points, team2Points, team1GoalsDone, team2GoalsDone)}
            />
            <div className="final-table-wrapper">
                <FinalTable teams={teams} group='F' />
            </div>
        </main>
    );
}
