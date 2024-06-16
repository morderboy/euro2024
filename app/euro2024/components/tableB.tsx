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
        { name: 'Spain', points: calculatePoints('Spain'), goals_done: calculateGoalsDone('Spain'), goals_left: calculateGoalsLeft('Spain') },
        { name: 'Croatia', points: calculatePoints('Croatia'), goals_done: calculateGoalsDone('Croatia'), goals_left: calculateGoalsLeft('Croatia') },
        { name: 'Italy', points: calculatePoints('Italy'), goals_done: calculateGoalsDone('Italy'), goals_left: calculateGoalsLeft('Italy') },
        { name: 'Albania', points: calculatePoints('Albania'), goals_done: calculateGoalsDone('Albania'), goals_left: calculateGoalsLeft('Albania') },
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
        <main id="TableB" className="flex min-h-screen flex-col items-center justify-center bg-white">
            <Match
                city="Berlin"
                date="Sa 15.06.2024"
                time="18:00"
                team1="Spain"
                team2="Croatia"
                size="xs"
                onPointsChange={(team1Points, team2Points, team1GoalsDone, team2GoalsDone) => handlePointsChange('Spain;Croatia', team1Points, team2Points, team1GoalsDone, team2GoalsDone)}
            />
            <Match
                city="Dortmund"
                date="Sa 15.06.2024"
                time="21:00"
                team1="Italy"
                team2="Albania"
                size="xs"
                onPointsChange={(team1Points, team2Points, team1GoalsDone, team2GoalsDone) => handlePointsChange('Italy;Albania', team1Points, team2Points, team1GoalsDone, team2GoalsDone)}
            />
            <Match
                city="Hamburg"
                date="We 19.06.2024"
                time="15:00"
                team1="Croatia"
                team2="Albania"
                size="xs"
                onPointsChange={(team1Points, team2Points, team1GoalsDone, team2GoalsDone) => handlePointsChange('Croatia;Albania', team1Points, team2Points, team1GoalsDone, team2GoalsDone)}
            />
            <Match
                city="Gelsenkirchen"
                date="Th 20.06.2024"
                time="21:00"
                team1="Spain"
                team2="Italy"
                size="xs"
                onPointsChange={(team1Points, team2Points, team1GoalsDone, team2GoalsDone) => handlePointsChange('Spain;Italy', team1Points, team2Points, team1GoalsDone, team2GoalsDone)}
            />
            <Match
                city="Dusseldorf"
                date="Mo 24.06.2024"
                time="21:00"
                team1="Albania"
                team2="Spain"
                size="xs"
                onPointsChange={(team1Points, team2Points, team1GoalsDone, team2GoalsDone) => handlePointsChange('Albania;Spain', team1Points, team2Points, team1GoalsDone, team2GoalsDone)}
            />
            <Match
                city="Leipzig"
                date="Mo 24.06.2024"
                time="21:00"
                team1="Croatia"
                team2="Italy"
                size="xs"
                onPointsChange={(team1Points, team2Points, team1GoalsDone, team2GoalsDone) => handlePointsChange('Croatia;Italy', team1Points, team2Points, team1GoalsDone, team2GoalsDone)}
            />
            <div className="final-table-wrapper">
                <FinalTable teams={teams} group='B' />
            </div>
        </main>
    );
}
