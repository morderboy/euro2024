'use client'
import React, { useState } from "react";
import NotGroupMatch from "./notgroupmatch"
import { getCookie } from "cookies-next";

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

    const insertName = () => {
        const cook = getCookie("name")?.toString();
        return cook
    }

    const isAllRoundsFilled = Object.keys(winners).length === 1;

    return (
    <main id="final" className="flex flex-col justify-center bg-white md:flex-row">
        <div className="items-center md:mr-4">
            <NotGroupMatch
                city="Berlin"
                date="Вс, 14.07.2024"
                time="21:00"
                team1={winners_prev.winners[1]}
                team2={winners_prev.winners[2]}
                size="xs"
                onPointsChange={(winner, idx) => handleWinnerChange(winner, idx)}
                top_label="Final"
            />
        </div>
        <div className="md:ml-4"> 
            <div className="">
                <div>
                    {`${insertName()}`}
                </div>
            </div>
            <div className="">
                {winners[1] !== undefined
                    ? `Победитель Euro 2024: ${winners[1]}`
                    : 'Результат неопределен'
                }
            </div>
        </div>
    </main>
    );
}