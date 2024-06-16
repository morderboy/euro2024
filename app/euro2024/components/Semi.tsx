'use client'
import React, { useState } from "react";
import NotGroupMatch from "./notgroupmatch"
import Final from "./Final"

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

    const isAllRoundsFilled = Object.keys(winners).length === 2;

    return (
        <main>
            <div id="semi" className="flex flex-col justify-center bg-white md:flex-row">
                <div className="md:mr-4">
                    <NotGroupMatch
                        city="Stuttgart"
                        date="Вт, 09.07.2024"
                        time="21:00"
                        team1={winners_prev.winners[1]}
                        team2={winners_prev.winners[2]}
                        size="xs"
                        onPointsChange={(winner, idx) => handleWinnerChange(winner, idx)}
                        top_label="Semi final - 1"
                    />
                </div>
                <div className="md:ml-4">
                    <NotGroupMatch
                        city="Hamburg"
                        date="Ср, 10.07.2024"
                        time="21:00"
                        team1={winners_prev.winners[4]}
                        team2={winners_prev.winners[3]}
                        size="xs"
                        onPointsChange={(winner, idx) => handleWinnerChange(winner, idx)}
                        top_label="Semi final - 2"
                    />
                </div>
            </div>
            <div>
                {isAllRoundsFilled && <Final winners={winners}/>}
            </div>
        </main>
    );
}