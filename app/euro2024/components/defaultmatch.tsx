'use client'
import React, { useState, useEffect, ChangeEvent, } from 'react';
import CountryFlag from './flag';

interface FootballMatchProps {
    city: string;
    date: string;
    time: string;
    team1: string;
    team2: string;
    size?: 'xs' | 'sm' | 'md' | 'lg';
    onPointsChange: (team1Points: number, team2Points: number, team1GoalsDone: number, team2GoalsDone: number) => void;
}

const truncateTeamName = (team: string): string => {
  if (team === 'Netherlands') {
    return 'NED';
  }
  // Если это не Нидерланды, вернуть название как есть
  return team;
};

export default function Match({ city, date, time, team1, team2, size = 'md', onPointsChange }: FootballMatchProps){
    const [score1, setScore1] = useState<string>('');
    const [score2, setScore2] = useState<string>('');

    const handleScore1Change = (e: ChangeEvent<HTMLInputElement>) => setScore1(e.target.value);
    const handleScore2Change = (e: ChangeEvent<HTMLInputElement>) => setScore2(e.target.value);

    useEffect(() => {
        const intScore1 = parseInt(score1, 10);
        const intScore2 = parseInt(score2, 10);
    
        if (!isNaN(intScore1) && !isNaN(intScore2)) {
          if (intScore1 > intScore2) {
            onPointsChange(3, 0, intScore1, intScore2);
          } else if (intScore1 < intScore2) {
            onPointsChange(0, 3, intScore1, intScore2);
          } else {
            onPointsChange(1, 1, intScore1, intScore2);
          }
        }
      }, [score1, score2]);

    const handleMouseWheel = () => {
    };

    const sizeClass = size === 'xs' ? 'max-w-xs' : size === 'sm' ? 'max-w-sm' : size === 'lg' ? 'max-w-lg' : 'max-w-md';

    return (
        <div className={`p-2 mb-2 bg-white rounded-lg shadow-md ${sizeClass}`}>
    <div className="text-xs font-bold mb-1 text-center">{city}</div>
    <div className="flex justify-between mb-1 text-xs">
        <div>{date}</div>
        <div>{time}</div>
    </div>
    <div className="flex justify-between">
        <div className="w-1/2 pr-1">
            <label className="block text-xs font-bold mb-1" htmlFor="score1">
                {truncateTeamName(team1)}
                <CountryFlag team={team1} />
            </label>
            <input
                type="number"
                id="score1"
                min="0"
                inputMode="numeric"
                value={score1}
                onChange={handleScore1Change}
                onWheel={handleMouseWheel}
                className="shadow appearance-none border rounded w-full py-1 px-2 text-center text-xs leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
            />
        </div>
        <div className="w-1/2 pl-1">
            <label className="block text-xs font-bold mb-1" htmlFor="score2">
                {truncateTeamName(team2)}
                <CountryFlag team={team2} />
            </label>
            <input
                type="number"
                id="score2"
                min="0"
                inputMode="numeric"
                value={score2}
                onChange={handleScore2Change}
                onWheel={handleMouseWheel}
                className="shadow appearance-none border rounded w-full py-1 px-2 text-center text-xs leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
            />
        </div>
    </div>
</div>

    );
}