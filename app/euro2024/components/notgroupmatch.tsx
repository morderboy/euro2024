'use client'
import React, { useState, useEffect, ChangeEvent } from 'react';
import CountryFlag from './flag';

interface FootballMatchProps {
  city: string;
  date: string;
  time: string;
  team1: string;
  team2: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  onPointsChange: (winner: string, idx: number) => void;
  top_label: string;
  isRound16?: boolean;
}

const truncateTeamName = (team: string): string => {
  if (team === 'Netherlands') {
    return 'NED';
  }

  if (team === 'Switzerland') {
    return 'SUI'
  }
  // Если это не Нидерланды, вернуть название как есть
  return team;
};

export default function NotGroupMatch({
  city,
  date,
  time,
  team1,
  team2,
  size = 'md',
  onPointsChange,
  top_label,
  isRound16 = false
}: FootballMatchProps) {
  const [score1, setScore1] = useState<string>('');
  const [score2, setScore2] = useState<string>('');
  const [penaltyScore1, setPenaltyScore1] = useState<string>('');
  const [penaltyScore2, setPenaltyScore2] = useState<string>('');
  const [equalScores, setEqualScores] = useState<boolean>(false);

  const handleScore1Change = (e: ChangeEvent<HTMLInputElement>) => setScore1(e.target.value);
  const handleScore2Change = (e: ChangeEvent<HTMLInputElement>) => setScore2(e.target.value);
  const handlePenaltyScore1Change = (e: ChangeEvent<HTMLInputElement>) =>
    setPenaltyScore1(e.target.value);
  const handlePenaltyScore2Change = (e: ChangeEvent<HTMLInputElement>) =>
    setPenaltyScore2(e.target.value);

  useEffect(() => {
    const intScore1 = parseInt(score1, 10);
    const intScore2 = parseInt(score2, 10);

    if (top_label == "Final"){
        if (!isNaN(intScore1) && !isNaN(intScore2)) {
            setEqualScores(intScore1 === intScore2);
            if (intScore1 > intScore2) {
              onPointsChange(team1, 1);
            } else if (intScore1 < intScore2) {
              onPointsChange(team2, 1);
            } else {
              // Результаты равны, проверяем пенальти
              if (!isNaN(parseInt(penaltyScore1)) && !isNaN(parseInt(penaltyScore2))) {
                if (parseInt(penaltyScore1) > parseInt(penaltyScore2)) {
                  onPointsChange(team1, 1);
                } else if (parseInt(penaltyScore1) < parseInt(penaltyScore2)) {
                  onPointsChange(team2, 1);
                } else {
                  onPointsChange(team1, 1);
                }
              }
            }
        }
        return
    }

    if (!isNaN(intScore1) && !isNaN(intScore2)) {
      setEqualScores(intScore1 === intScore2);
      if (intScore1 > intScore2) {
        onPointsChange(team1, parseInt(top_label.split('-')[1].trim()));
      } else if (intScore1 < intScore2) {
        onPointsChange(team2, parseInt(top_label.split('-')[1].trim()));
      } else {
        // Результаты равны, проверяем пенальти
        if (!isNaN(parseInt(penaltyScore1)) && !isNaN(parseInt(penaltyScore2))) {
          if (parseInt(penaltyScore1) > parseInt(penaltyScore2)) {
            onPointsChange(team1, parseInt(top_label.split('-')[1].trim()));
          } else if (parseInt(penaltyScore1) < parseInt(penaltyScore2)) {
            onPointsChange(team2, parseInt(top_label.split('-')[1].trim()));
          } else {
            onPointsChange(team1, parseInt(top_label.split('-')[1].trim()));
          }
        }
      }
    }
  }, [score1, score2, penaltyScore1, penaltyScore2]);

  const handleMouseWheel = () => {};

  const sizeClass =
    size === 'xs'
      ? 'max-w-xs'
      : size === 'sm'
      ? 'max-w-sm'
      : size === 'lg'
      ? 'max-w-lg'
      : 'max-w-md';

  return (
    <div
      className={`p-2 mb-2 bg-white rounded-lg shadow-md ${sizeClass}`}
    >
      <div className="text-xs font-bold mb-1 text-center">{top_label}</div>
      <div className="text-xs font-bold mb-1 text-center">{city}</div>
      <div className="flex justify-between mb-1 text-xs">
        <div>{date}</div>
        <div>{time}</div>
      </div>
      <div className="flex justify-between">
        <div className="w-1/2 pr-1">
          <label className="block text-xs font-bold mb-1" htmlFor="score1">
            {isRound16 ? truncateTeamName(team1) : team1}
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
            {isRound16 ? truncateTeamName(team2) : team2}
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
        <label className={`block text-xs font-bold mb-1 ${equalScores ? 'text-red-500' : ''}`} htmlFor="penaltyScore1">
            Penalty
        </label>
        <div className="flex justify-between">
          <div className="w-1/2 pr-1">
            <input
              type="number"
              id="penaltyScore1"
              min="0"
              inputMode="numeric"
              value={penaltyScore1}
              onChange={handlePenaltyScore1Change}
              onWheel={handleMouseWheel}
              className="shadow appearance-none border rounded w-full py-1 px-2 text-center text-xs leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
            />
          </div>
          <div className="w-1/2 pl-1">
            <input
              type="number"
              id="penaltyScore2"
              min="0"
              inputMode="numeric"
              value={penaltyScore2}
              onChange={handlePenaltyScore2Change}
              onWheel={handleMouseWheel}
              className="shadow appearance-none border rounded w-full py-1 px-2 text-center text-xs leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
            />
          </div>
        </div>
    </div>
  );
}
