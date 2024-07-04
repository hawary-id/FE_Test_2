'use client';

import { Bar, BarChart, CartesianGrid, LabelList, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface IBarChartProps {
    data: {
        nama: string;
        total: number;
    }[]
}

export default function ChartBar({data}:IBarChartProps) {
   
   return (
    <ResponsiveContainer width="100%" height="100%">
        <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
            top: 30,
            right: 30,
            left: 20,
            bottom: 5,
        }}
        >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="nama" />
        <YAxis
            label={{
            value: 'Jumlah Laian',
            angle: -90,
            position: 'insideLeft',
            textAnchor: 'middle',
            style: { fontSize: 12 },
            dx: -20
            }}
        />
        <Tooltip />
        <Legend />
            <Bar dataKey="total" fill="#3381F7">
                <LabelList dataKey="total" position="top" />
            </Bar>
        </BarChart>
    </ResponsiveContainer>
   );
}