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
        { name: 'Romania', points: calculatePoints('Romania'), goals_done: calculateGoalsDone('Romania'), goals_left: calculateGoalsLeft('Romania') },
        { name: 'Ukraine', points: calculatePoints('Ukraine'), goals_done: calculateGoalsDone('Ukraine'), goals_left: calculateGoalsLeft('Ukraine') },
        { name: 'Slovakia', points: calculatePoints('Slovakia'), goals_done: calculateGoalsDone('Slovakia'), goals_left: calculateGoalsLeft('Slovakia') },
        { name: 'Belgium', points: calculatePoints('Belgium'), goals_done: calculateGoalsDone('Belgium'), goals_left: calculateGoalsLeft('Belgium') },
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
        <main id="TableE" className="flex min-h-screen flex-col items-center justify-center bg-white">
            <Match
                city="Munich"
                date="Mo 17.06.2024"
                time="15:00"
                team1="Romania"
                team2="Ukraine"
                size="xs"
                onPointsChange={(team1Points, team2Points, team1GoalsDone, team2GoalsDone) => handlePointsChange('Romania;Ukraine', team1Points, team2Points, team1GoalsDone, team2GoalsDone)}
            />
            <Match
                city="Frankfurt"
                date="Mo 17.06.2024"
                time="18:00"
                team1="Belgium"
                team2="Slovakia"
                size="xs"
                onPointsChange={(team1Points, team2Points, team1GoalsDone, team2GoalsDone) => handlePointsChange('Belgium;Slovakia', team1Points, team2Points, team1GoalsDone, team2GoalsDone)}
            />
            <Match
                city="Dusseldorf"
                date="Fr 21.06.2024"
                time="15:00"
                team1="Slovakia"
                team2="Ukraine"
                size="xs"
                onPointsChange={(team1Points, team2Points, team1GoalsDone, team2GoalsDone) => handlePointsChange('Slovakia;Ukraine', team1Points, team2Points, team1GoalsDone, team2GoalsDone)}
            />
            <Match
                city="Cologne"
                date="Sa 22.06.2024"
                time="21:00"
                team1="Belgium"
                team2="Romania"
                size="xs"
                onPointsChange={(team1Points, team2Points, team1GoalsDone, team2GoalsDone) => handlePointsChange('Belgium;Romania', team1Points, team2Points, team1GoalsDone, team2GoalsDone)}
            />
            <Match
                city="Frankfurt"
                date="We 26.06.2024"
                time="18:00"
                team1="Slovakia"
                team2="Romania"
                size="xs"
                onPointsChange={(team1Points, team2Points, team1GoalsDone, team2GoalsDone) => handlePointsChange('Slovakia;Romania', team1Points, team2Points, team1GoalsDone, team2GoalsDone)}
            />
            <Match
                city="Stuttgart"
                date="We 26.06.2024"
                time="18:00"
                team1="Ukraine"
                team2="Belgium"
                size="xs"
                onPointsChange={(team1Points, team2Points, team1GoalsDone, team2GoalsDone) => handlePointsChange('Ukraine;Belgium', team1Points, team2Points, team1GoalsDone, team2GoalsDone)}
            />
            <div className="final-table-wrapper">
                <FinalTable teams={teams} group='E' />
            </div>
        </main>
    );
}
