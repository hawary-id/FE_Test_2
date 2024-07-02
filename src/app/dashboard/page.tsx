'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import Select from 'react-select';
import { Bar, BarChart, CartesianGrid, LabelList, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function Home() {
    const [filterDate, setFilterDate] = useState('');

    const data = [
        {
          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
    ];

    const data02 = [
        { name: 'Group A', value: 2400 },
        { name: 'Group B', value: 4567 },
        { name: 'Group C', value: 1398 },
        { name: 'Group D', value: 9800 },
        { name: 'Group E', value: 3908 },
        { name: 'Group F', value: 4800 },
      ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Dashboard</CardTitle>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <Separator/>
            <CardContent>
                <div className="grid grid-cols-4 gap-5 pt-5">
                    <Input type="date" className="w-full inline-block" value={filterDate} onChange={(e) => setFilterDate(e.target.value)}/>
                    <div className="flex items-center gap-3">
                        <Button>Filter</Button>
                        <Button variant="outline">Reset</Button>
                    </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-5 py-8">
                    <div className="w-full md:w-3/4 h-72">
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
                            <XAxis dataKey="name" />
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
                                <Bar dataKey="pv" fill="#3381F7">
                                    <LabelList dataKey="pv" position="top" />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="w-full h-72 md:w-1/4">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart width={400} height={400}>
                                <Pie dataKey="value" data={data02} innerRadius={50} outerRadius={90} fill="#82ca9d" />
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-5 py-8">
                    <div className="w-full md:w-3/4 h-72">
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
                            <XAxis dataKey="name" />
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
                                <Bar dataKey="pv" fill="#3381F7">
                                    <LabelList dataKey="pv" position="top" />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="w-full h-72 md:w-1/4">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart width={400} height={400}>
                                <Pie dataKey="value" data={data02} innerRadius={50} outerRadius={90} fill="#82ca9d" />
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
