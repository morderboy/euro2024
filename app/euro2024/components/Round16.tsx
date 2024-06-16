'use client'
import React, { useEffect, useState } from "react";
import NotGroupMatch from "./notgroupmatch";
import Quarter from "./Quarter";
import { Team } from './types'

interface GroupedTeams {
    [key: string]: Team[];
}

interface Match {
    team1: Team;
    team2: Team;
}

function getRound16Matches(groupedTeams: GroupedTeams) {
    // Сортировка команд внутри каждой группы по очкам
    Object.keys(groupedTeams).forEach((group) => {
        groupedTeams[group].sort((a, b) => {
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
    });

    // Функция для выбора команды с наибольшими очками из списка претендентов
    const chooseTeam = (candidates: Team[], chosenTeams: Set<string>): Team | null => {
        for (let i = 0; i < candidates.length; i++) {
            if (!chosenTeams.has(candidates[i].name)) {
                chosenTeams.add(candidates[i].name);
                return candidates[i];
            }
        }
        return null;
    };

    // Set для отслеживания выбранных команд
    const chosenTeams = new Set<string>();

    return [
        { city: "Cologne", date: "Вс, 30.06.2024", time: "21:00", team1: groupedTeams['B'][0], team2: chooseTeam([groupedTeams['A'][2], groupedTeams['D'][2], groupedTeams['E'][2], groupedTeams['F'][2]], chosenTeams)!, label: "Round of 16 - 4" },
        { city: "Dortmund", date: "Сб, 29.06.2024", time: "21:00", team1: groupedTeams['A'][0], team2: groupedTeams['C'][1], label: "Round of 16 - 2" },
        { city: "Frankfurt", date: "Пн, 01.07.2024", time: "21:00", team1: groupedTeams['F'][0], team2: chooseTeam([groupedTeams['A'][2], groupedTeams['B'][2], groupedTeams['C'][2]], chosenTeams)!, label: "Round of 16 - 6" },
        { city: "Dusseldorf", date: "Пн, 01.07.2024", time: "18:00", team1: groupedTeams['D'][1], team2: groupedTeams['E'][1], label: "Round of 16 - 5" },
        { city: "Munich", date: "Вт, 02.07.2024", time: "18:00", team1: groupedTeams['E'][0], team2: chooseTeam([groupedTeams['A'][2], groupedTeams['B'][2], groupedTeams['C'][2], groupedTeams['D'][2]], chosenTeams)!, label: "Round of 16 - 7" },
        { city: "Leipzig", date: "Вт, 02.07.2024", time: "21:00", team1: groupedTeams['D'][0], team2: groupedTeams['F'][1], label: "Round of 16 - 8" },
        { city: "Gelsenkirchen", date: "Вс, 30.06.2024", time: "18:00", team1: groupedTeams['C'][0], team2: chooseTeam([groupedTeams['D'][2], groupedTeams['E'][2], groupedTeams['F'][2]], chosenTeams)!, label: "Round of 16 - 3" },
        { city: "Berlin", date: "Сб, 29.06.2024", time: "18:00", team1: groupedTeams['A'][1], team2: groupedTeams['B'][1], label: "Round of 16 - 1" }
    ];
}

export default function Round16({ allteams }: { allteams: GroupedTeams }){
    const [winners, setWinner] = useState<{ [key: number]: string }>({});
    const matches = getRound16Matches(allteams);

    const handleWinnerChange = (winner: string, idx: number) => {
        setWinner(prevWinner => ({
        ...prevWinner,
        [idx]: winner,
        }));
    };

    const isAllRoundsFilled = Object.keys(winners).length === 8;

    return (
        <main>
            <div id="round" className="flex flex-col justify-center bg-white md:flex-row">
                {matches.map((match, index) => (
                    match.team2.name &&
                    <NotGroupMatch
                        key={index}
                        city={match.city}
                        date={match.date}
                        time={match.time}
                        team1={match.team1.name}
                        team2={match.team2.name}
                        size="xs"
                        onPointsChange={(winner, idx) => handleWinnerChange(winner, idx)}
                        top_label={match.label}
                        isRound16={true}
                    />
                ))}
            </div>
            <div>
                {isAllRoundsFilled && <Quarter winners={winners}/>}
            </div>
        </main>
    );
}