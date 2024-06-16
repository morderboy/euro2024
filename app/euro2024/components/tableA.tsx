'use client'
import React, { useState, useEffect } from 'react';
import Match from './defaultmatch';
import FinalTable from './finaltable';
import { Team } from './types'

interface TableAProps {
    onTeamsUpdate: (teams: Team[]) => void;
}

export default function TableA({ onTeamsUpdate }: TableAProps) {
    const [points, setPoints] = useState<{ [key: string]: { team1Points: number, team2Points: number, team1GoalsDone: number, team2GoalsDone: number } }>({});
    const teams: Team[] = [
        { name: 'Germany', points: calculatePoints('Germany'), goals_done: calculateGoalsDone('Germany'), goals_left: calculateGoalsLeft('Germany') },
        { name: 'Scotland', points: calculatePoints('Scotland'), goals_done: calculateGoalsDone('Scotland'), goals_left: calculateGoalsLeft('Scotland') },
        { name: 'Hungary', points: calculatePoints('Hungary'), goals_done: calculateGoalsDone('Hungary'), goals_left: calculateGoalsLeft('Hungary') },
        { name: 'Switzerland', points: calculatePoints('Switzerland'), goals_done: calculateGoalsDone('Switzerland'), goals_left: calculateGoalsLeft('Switzerland') },
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
        <main id="TableA" className="flex min-h-screen flex-col items-center justify-center bg-white">
            <Match
                city="Munich"
                date="Fr 14.06.2024"
                time="21:00"
                team1="Germany"
                team2="Scotland"
                size="xs"
                onPointsChange={(team1Points, team2Points, team1GoalsDone, team2GoalsDone) => handlePointsChange('Germany;Scotland', team1Points, team2Points, team1GoalsDone, team2GoalsDone)}
            />
            <Match
                city="Cologne"
                date="Sa 15.06.2024"
                time="15:00"
                team1="Hungary"
                team2="Switzerland"
                size="xs"
                onPointsChange={(team1Points, team2Points, team1GoalsDone, team2GoalsDone) => handlePointsChange('Hungary;Switzerland', team1Points, team2Points, team1GoalsDone, team2GoalsDone)}
            />
            <Match
                city="Stuttgart"
                date="We 19.06.2024"
                time="18:00"
                team1="Germany"
                team2="Hungary"
                size="xs"
                onPointsChange={(team1Points, team2Points, team1GoalsDone, team2GoalsDone) => handlePointsChange('Germany;Hungary', team1Points, team2Points, team1GoalsDone, team2GoalsDone)}
            />
            <Match
                city="Cologne"
                date="We 19.06.2024"
                time="21:00"
                team1="Scotland"
                team2="Switzerland"
                size="xs"
                onPointsChange={(team1Points, team2Points, team1GoalsDone, team2GoalsDone) => handlePointsChange('Scotland;Switzerland', team1Points, team2Points, team1GoalsDone, team2GoalsDone)}
            />
            <Match
                city="Frankfurt"
                date="Su 23.06.2024"
                time="21:00"
                team1="Switzerland"
                team2="Germany"
                size="xs"
                onPointsChange={(team1Points, team2Points, team1GoalsDone, team2GoalsDone) => handlePointsChange('Switzerland;Germany', team1Points, team2Points, team1GoalsDone, team2GoalsDone)}
            />
            <Match
                city="Stuttgart"
                date="Su 23.06.2024"
                time="21:00"
                team1="Scotland"
                team2="Hungary"
                size="xs"
                onPointsChange={(team1Points, team2Points, team1GoalsDone, team2GoalsDone) => handlePointsChange('Scotland;Hungary', team1Points, team2Points, team1GoalsDone, team2GoalsDone)}
            />
            <div className="final-table-wrapper">
                <FinalTable teams={teams} group='A' />
            </div>
        </main>
    );
}
