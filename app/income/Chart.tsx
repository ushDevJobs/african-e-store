"use client"
import { Line } from 'react-chartjs-2';
import React from 'react'

import {
    Chart as ChartJS,
    CategoryScale,
    LineElement,
    LinearScale,
    PointElement,
} from 'chart.js';
import { IncomeIcon2 } from '../components/SVGs/SVGicons';

type Props = {};

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement);

const Chart = (props: Props) => {
    const charts = [
        {
            "name": "Page A",
            "uv": 4000,
            "pv": 2400,
            "amt": 2400
        },
        {
            "name": "Page B",
            "uv": 3000,
            "pv": 1398,
            "amt": 2210
        },
        {
            "name": "Page C",
            "uv": 2000,
            "pv": 9800,
            "amt": 2290
        },
        {
            "name": "Page D",
            "uv": 2780,
            "pv": 3908,
            "amt": 2000
        },
        {
            "name": "Page E",
            "uv": 1890,
            "pv": 4800,
            "amt": 2181
        },
        {
            "name": "Page F",
            "uv": 2390,
            "pv": 3800,
            "amt": 2500
        },
        {
            "name": "Page G",
            "uv": 3490,
            "pv": 4300,
            "amt": 2100
        }
    ]

    var data = {
        labels: charts?.map((chart) => {
            return chart.pv;
        }),
        datasets: [
            {
                label: '# of Votes',
                data: charts?.map((chart) => chart.uv),
                backgroundColor: 'transparent',
                pointerBorderColor: 'transparent',
                borderWidth: 2,
                tension: 0.5,
                borderColor: '#6092C0',
                // pointerBorderWidth: 4,
            },
        ],
    };

    var options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        maintainAspectRatio: false,
        legend: {
            label: {
                fontSize: 26,
            },
        },
    };

    return (
        <div className='pb-20 rounded-2xl bg-white shadow-lg px-10'>
            <div className="mb-5">
                <p className="flex items-center gap-2"><span className='w-[36px] h-[36px] bg-[#E9E6FF] grid place-items-center rounded-full'><IncomeIcon2 /></span> Income</p>
            </div>
            <div>
                {charts && <Line height={250    } data={data} options={options} />}
            </div>
        </div>
    )
}

export default Chart