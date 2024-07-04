'use client';

import { Cell, LabelList, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface IChartPieProps {
    data: {
        name: string;
        total: number;
    }[]
}

const colors = ['#FF5733', '#3498DB', '#2ECC71', '#F1C40F', '#9B59B6', '#E74C3C', '#1ABC9C', '#F39C12', '#8E44AD', '#34495E'];

export default function ChartPie({data}:IChartPieProps) {    
    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
                <Pie dataKey="total" data={data} innerRadius={50} outerRadius={90}>
                    <LabelList dataKey="total"/>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]}/>
                    ))}
                </Pie>
                <Legend verticalAlign="bottom" height={36}/>
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    );
}