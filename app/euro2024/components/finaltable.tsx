import React from 'react';
import CountryFlag from './flag';
import { Team } from './types'

interface FinalTableProps {
  teams: Team[];
  group: string;
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

export default function FinalTable({ teams, group }: FinalTableProps) {
  const sortedTeams = [...teams].sort((a, b) => {
    // Первичный критерий: Очки
    if (b.points !== a.points) return b.points - a.points;

    if (a.points === b.points) {
      if (a.name === "Germany") return -1;
      if (b.name === "Germany") return 1;
    }

    // Вторичный критерий: Разница между голами
    const goalDifferenceA = a.goals_done - a.goals_left;
    const goalDifferenceB = b.goals_done - b.goals_left;
    if (goalDifferenceB !== goalDifferenceA) return goalDifferenceB - goalDifferenceA;

    // Третичный критерий: Меньшее количество пропущенных голов
    return a.goals_left - b.goals_left;
  });

  return (
    <div className="mt-8 bg-white">
      <h2 className="text-lg font-semibold mb-4">{`Final table ${group}`}</h2>
      <table className="border-collapse border">
        <thead>
          <tr className="bg-white">
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Team</th>
            <th className="border px-4 py-2">Points</th>
          </tr>
        </thead>
        <tbody>
          {sortedTeams.map((team, index) => (
            <tr key={team.name}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-2 py-1 flex items-center">
                {truncateTeamName(team.name)}
                <CountryFlag team={team.name} /> {/* Добавляем компонент флага */}
              </td>
              <td className="border px-4 py-2">{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}