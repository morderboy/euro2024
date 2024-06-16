'use client'
import React, { useEffect, useState } from 'react';
import TableA from './components/tableA';
import TableB from './components/tableB';
import TableC from './components/tableC';
import TableD from './components/tableD';
import TableE from './components/tableE';
import TableF from './components/tableF';
import PdfBtn from './components/pdfbtn';
import Round16 from './components/Round16';
import { Team } from './components/types';
import PdfBtnMobile from './components/PdfBtnMobile';

interface GroupedTeams {
    [key: string]: Team[];
}

export default function Main(){
    const [groupATeams, setGroupATeams] = useState<Team[]>([]);
    const [groupBTeams, setGroupBTeams] = useState<Team[]>([]);
    const [groupCTeams, setGroupCTeams] = useState<Team[]>([]);
    const [groupDTeams, setGroupDTeams] = useState<Team[]>([]);
    const [groupETeams, setGroupETeams] = useState<Team[]>([]);
    const [groupFTeams, setGroupFTeams] = useState<Team[]>([]);
    const [isAllGroupsFilled, setAllGroupsFilled] = useState<boolean>(false)

    const handleTeamsUpdate = (setGroupTeams: React.Dispatch<React.SetStateAction<Team[]>>) => (teams: Team[]) => {
        setGroupTeams(teams);
    };

    const groupedTeams: GroupedTeams = {
        'A': groupATeams,
        'B': groupBTeams,
        'C': groupCTeams,
        'D': groupDTeams,
        'E': groupETeams,
        'F': groupFTeams,
    };

    useEffect(() => {
        // Проверяем, заполнены ли все группы
        const allGroupsFilled = Object.keys(groupedTeams).every(group => groupedTeams[group].length > 0);
        setAllGroupsFilled(allGroupsFilled);
    }, [groupATeams, groupBTeams, groupCTeams, groupDTeams, groupETeams, groupFTeams]);

    return (
        <main>
        <div id="main" className='bg-white'>
            <div className="print-container flex min-h-screen flex-col items-start justify-start p-4 overflow-x-auto space-y-4 md:flex-row md:space-y-0 md:space-x-4 final-table-wrapper">
                <div id="group-a" className="p-1">
                    <h3 className="text-center font-bold mb-2">Group A</h3>
                    <TableA onTeamsUpdate={handleTeamsUpdate(setGroupATeams)} />
                </div>
                <div id="group-b" className="p-1">
                    <h3 className="text-center font-bold mb-2">Group B</h3>
                    <TableB onTeamsUpdate={handleTeamsUpdate(setGroupBTeams)} />
                </div>
                <div id="group-c" className="p-1">
                    <h3 className="text-center font-bold mb-2">Group C</h3>
                    <TableC onTeamsUpdate={handleTeamsUpdate(setGroupCTeams)} />
                </div>
                <div id="group-d" className="p-1">
                    <h3 className="text-center font-bold mb-2">Group D</h3>
                    <TableD onTeamsUpdate={handleTeamsUpdate(setGroupDTeams)} />
                </div>
                <div id="group-e" className="p-1">
                    <h3 className="text-center font-bold mb-2">Group E</h3>
                    <TableE onTeamsUpdate={handleTeamsUpdate(setGroupETeams)} />
                </div>
                <div id="group-f" className="p-1">
                    <h3 className="text-center font-bold mb-2">Group F</h3>
                    <TableF onTeamsUpdate={handleTeamsUpdate(setGroupFTeams)} />
                </div>
            </div>
            <div className="print-container new-page">
                {isAllGroupsFilled && groupedTeams['A'].length > 0 && <Round16 allteams={groupedTeams} />}
            </div>
        </div>
        <div className='bg-blue-500 text-white font-bold py-1 px-2 rounded fixed top-0 left-0 mt-2 ml-2 z-50'>
            <div className="hidden md:block">
                <PdfBtn />
            </div>
            <div className="block md:hidden">
                <PdfBtnMobile />
            </div>
        </div>
        </main>
    );
}
