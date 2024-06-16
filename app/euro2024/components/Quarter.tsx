'use client'
import React, { useState } from "react";
import NotGroupMatch from "./notgroupmatch"
import Semi from "./Semi"

interface Winners {
    winners: { [key: number]: string };
  }

export default function Quarter(winners_prev: Winners){
    const [winners, setWinner] = useState<{ [key: number]: string }>({});

    const handleWinnerChange = (winner: string, idx: number) => {
        setWinner(prevWinner => ({
        ...prevWinner,
        [idx]: winner,
        }));
    };

    const isAllRoundsFilled = Object.keys(winners).length === 4;

    return (
        <main>
            <div id="quarter" className="flex flex-col justify-center bg-white md:flex-row">
                <div className="">
                    <NotGroupMatch
                        city="Stuttgart"
                        date="Пт, 05.07.2024"
                        time="18:00"
                        team1={winners_prev.winners[4]}
                        team2={winners_prev.winners[2]}
                        size="xs"
                        onPointsChange={(winner, idx) => handleWinnerChange(winner, idx)}
                        top_label="Quarter final - 1"
                        />
                </div>
                <div className="md:mr-4 md:ml-4">
                    <NotGroupMatch
                        city="Hamburg"
                        date="Пт, 05.07.2024"
                        time="21:00"
                        team1={winners_prev.winners[6]}
                        team2={winners_prev.winners[5]}
                        size="xs"
                        onPointsChange={(winner, idx) => handleWinnerChange(winner, idx)}
                        top_label="Quarter final - 2"
                        />
                </div>
                <div className="md:mr-4 md:ml-4">
                    <NotGroupMatch
                        city="Berlin"
                        date="Сб, 06.07.2024"
                        time="21:00"
                        team1={winners_prev.winners[7]}
                        team2={winners_prev.winners[8]}
                        size="xs"
                        onPointsChange={(winner, idx) => handleWinnerChange(winner, idx)}
                        top_label="Quarter final - 4"
                        />
                </div>
                <div className="">
                    <NotGroupMatch
                        city="Dusseldorf"
                        date="Сб, 06.07.2024"
                        time="18:00"
                        team1={winners_prev.winners[3]}
                        team2={winners_prev.winners[1]}
                        size="xs"
                        onPointsChange={(winner, idx) => handleWinnerChange(winner, idx)}
                        top_label="Quarter final - 3"
                        />
                </div>
            </div>
            <div>
                {isAllRoundsFilled && <Semi winners={winners}/>}
            </div>
        </main>
    );
}