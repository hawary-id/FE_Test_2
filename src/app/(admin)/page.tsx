'use client'
import Loading from "@/components/Loading";
import ChartBar from "@/components/chart/ChartBar";
import ChartPie from "@/components/chart/ChartPie";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useAppContext } from "@/context/useAppContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface LalinData {
    id: number;
    IdCabang: number;
    IdGerbang: number;
    Tanggal: string;
    Shift: number;
    IdGardu: number;
    Golongan: number;
    IdAsalGerbang: number;
    Tunai: number;
    DinasOpr: number;
    DinasMitra: number;
    DinasKary: number;
    eMandiri: number;
    eBri: number;
    eBni: number;
    eBca: number;
    eNobu: number;
    eDKI: number;
    eMega: number;
    eFlo: number;
}

interface Totals {
    [key: string]: number;
}

export default function Home() {
    const { token } = useAppContext();
    const router = useRouter();
    const [filterDate, setFilterDate] = useState('');
    const [activeFilterDate, setActiveFilterDate] = useState('');
    const [lalinsData, setLalinsData] = useState<LalinData[]>([]);
    const [loading, setLoading] = useState(false);
    const [totalBank, setTotalBank] = useState<Totals>({});
    const [totalGerbang, setTotalsGerbang] = useState<Totals>({});
    const [totalShift, setTotalShift] = useState<Totals>({});
    const [totalRuas, setTotalRuas] = useState<Totals>({});

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/signin');
        }
    }, []);

    useEffect(() => {
        setLoading(true);
        const fetchLalinsData = async () => {
            try {
                const apiUrl = activeFilterDate
                    ? `http://localhost:8080/api/lalins?tanggal=${activeFilterDate}`
                    : 'http://localhost:8080/api/lalins';
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const responseData = await response.json();
                setLalinsData(responseData.data.rows.rows);
            } catch (error) {
                console.error('Error fetching lalins data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchLalinsData();
        }
    }, [token, activeFilterDate]);

    useEffect(() => {
        const calculateTotals = () => {
            const newTotals: { [key: string]: number } = {};

            lalinsData.forEach((item: any) => {
                Object.keys(item).forEach((key) => {
                    if (key.startsWith('e') && key !== 'eToll') {
                        newTotals[key] = (newTotals[key] || 0) + (item[key] || 0);
                    }
                });
            });
            setTotalBank(newTotals);
        };

        if (!loading && lalinsData.length > 0) {
            calculateTotals();
        }
    }, [loading, lalinsData]);

    const formattedTotalBank = Object.entries(totalBank)
        .map(([bankCode, total]) => {
            const bankName = bankCode.substring(1);
            return { nama: bankName, total };
        })
        .sort((a, b) => b.total - a.total);

    useEffect(() => {
        const calculateTotalsPerGerbang = () => {
            const newTotals: { [key: string]: number } = {};

            lalinsData.forEach((item) => {
                const gerbangName = `Gerbang ${item.IdGerbang}`;
                newTotals[gerbangName] = (newTotals[gerbangName] || 0) + 1;
            });

            setTotalsGerbang(newTotals);
        };

        if (!loading && lalinsData.length > 0) {
            calculateTotalsPerGerbang();
        }
    }, [loading, lalinsData]);

    const formattedTotalGerbang = Object.entries(totalGerbang)
        .map(([gerbangName, total]) => {
            return { nama: gerbangName, total };
        })
        .sort((a, b) => b.total - a.total);

    useEffect(() => {
        const calculateTotalsPerShift = () => {
            const newTotals: { [key: string]: number } = {};
            const totalSemuaShift = lalinsData.length;

            lalinsData.forEach((item) => {
                const shiftName = `Shift ${item.Shift}`;
                newTotals[shiftName] = (newTotals[shiftName] || 0) + 1;
            });

            for (const shiftName in newTotals) {
                newTotals[shiftName] = (newTotals[shiftName] / totalSemuaShift) * 100;
            }

            setTotalShift(newTotals);
        };

        if (!loading && lalinsData.length > 0) {
            calculateTotalsPerShift();
        }
    }, [loading, lalinsData]);

    const formattedTotalsShift = Object.entries(totalShift).map(([name, total]) => ({ name, total }));

    useEffect(() => {
        const calculateTotalsPerCabang = () => {
            const newTotals: { [key: string]: number } = {};
            const totalSemuaCabang = lalinsData.length;

            lalinsData.forEach((item) => {
                const cabangName = `Ruas ${item.IdCabang}`;
                newTotals[cabangName] = (newTotals[cabangName] || 0) + 1;
            });

            for (const cabangName in newTotals) {
                newTotals[cabangName] = (newTotals[cabangName] / totalSemuaCabang) * 100;
            }

            setTotalRuas(newTotals);
        };

        if (!loading && lalinsData.length > 0) {
            calculateTotalsPerCabang();
        }
    }, [loading, lalinsData]);

    const formattedTotalsCabang = Object.entries(totalRuas).map(([name, total]) => ({ name, total }));

    const handleFilterClick = () => {
        setLoading(true);
        setActiveFilterDate(filterDate);
    };

    const handleResetClick = () => {
        setFilterDate('');
        setActiveFilterDate('');
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Dashboard</CardTitle>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent>
                <div className="grid grid-cols-4 gap-5 pt-5">
                    <Input type="date" className="w-full inline-block" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} />
                    <div className="flex items-center gap-3">
                        <Button onClick={handleFilterClick}>Filter</Button>
                        <Button variant="outline" onClick={handleResetClick}>Reset</Button>
                    </div>
                </div>

                {loading ? (
                    <Loading />
                ) : (
                    <>
                        <div className="flex flex-col md:flex-row gap-5 py-8">
                            <div className="w-full md:w-3/4 h-72">
                                <ChartBar data={formattedTotalBank} />
                            </div>

                            <div className="w-full h-72 md:w-1/4">
                                <ChartPie data={formattedTotalsShift} />
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-5 py-8">
                            <div className="w-full md:w-3/4 h-72">
                                <ChartBar data={formattedTotalGerbang} />
                            </div>

                            <div className="w-full h-72 md:w-1/4">
                                <ChartPie data={formattedTotalsCabang} />
                            </div>
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    );
}
