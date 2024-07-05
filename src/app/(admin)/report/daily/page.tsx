"use client"
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegFilePdf } from "react-icons/fa";
import { RiFileExcel2Line } from "react-icons/ri";
import { TiExportOutline } from "react-icons/ti";
import { Lalin, columns } from "./columns";
import { DataTable } from "./datatable";
import { useAppContext } from "@/context/useAppContext";

interface apiData {
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
    gol_1: number;
    gol_2: number;
    gol_3: number;
    gol_4: number;
    gol_5: number;
}

interface LalinData {
    IdCabang: number;
    IdGerbang: number;
    IdGardu: number;
    Tanggal: string;
    Hari: string;
    MetodePembayaran: string;
    GolI: number;
    GolII: number;
    GolIII: number;
    GolIV: number;
    GolV: number;
    Total: number;
}

const CLUSTER_PEMBAYARAN: { [key: string]: string } = {
    eMandiri: 'eMandiri',
    eBri: 'eBri',
    eBni: 'eBni',
    eBca: 'eBca',
    eNobu: 'eNobu',
    eDKI: 'eDKI',
    eMega: 'eMega',
    eFlo: 'eFlo'
};

export default function Daily() {
    const { token } = useAppContext();
    const [filterText, setFilterText] = useState("");
    const [filterDate, setFilterDate] = useState('');
    const [activeFilterDate, setActiveFilterDate] = useState('');
    const [data, setData] = useState<LalinData[]>([]);
    const [loading, setLoading] = useState(false);
    const [filteredData, setFilteredData] = useState(data);
    const [selectedMethod, setSelectedMethod] = useState('tunai');
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/signin');
        }
    }, [router]);

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
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const responseData = await response.json();
                const transformedData: { [key: string]: apiData } = {};

                responseData.data.rows.rows.forEach((row: apiData) => {
                    const tanggal = row.Tanggal.split("T")[0];
                    const key = `${tanggal}-${row.Golongan}`;

                    if (!transformedData[key]) {
                        transformedData[key] = {
                            IdCabang: row.IdCabang,
                            IdGerbang: row.IdGerbang,
                            IdGardu: row.IdGardu,
                            Tanggal: tanggal,
                            Hari: new Date(tanggal).toLocaleDateString('id-ID', { weekday: 'long' }),
                            GolI: 0,
                            GolII: 0,
                            GolIII: 0,
                            GolIV: 0,
                            GolV: 0,
                            Total: 0,
                        };
                    }

                    transformedData[key].Total += row.Tunai + row.DinasOpr + row.DinasMitra + row.DinasKary + row.eMandiri + row.eBri + row.eBni + row.eBca + row.eNobu + row.eDKI + row.eMega + row.eFlo;

                    switch (row.Golongan) {
                        case 1:
                            transformedData[key].GolI += row.Tunai + row.DinasOpr + row.DinasMitra + row.DinasKary + row.eMandiri + row.eBri + row.eBni + row.eBca + row.eNobu + row.eDKI + row.eMega + row.eFlo;
                            break;
                        case 2:
                            transformedData[key].GolII += row.Tunai + row.DinasOpr + row.DinasMitra + row.DinasKary + row.eMandiri + row.eBri + row.eBni + row.eBca + row.eNobu + row.eDKI + row.eMega + row.eFlo;
                            break;
                        case 3:
                            transformedData[key].GolIII += row.Tunai + row.DinasOpr + row.DinasMitra + row.DinasKary + row.eMandiri + row.eBri + row.eBni + row.eBca + row.eNobu + row.eDKI + row.eMega + row.eFlo;
                            break;
                        case 4:
                            transformedData[key].GolIV += row.Tunai + row.DinasOpr + row.DinasMitra + row.DinasKary + row.eMandiri + row.eBri + row.eBni + row.eBca + row.eNobu + row.eDKI + row.eMega + row.eFlo;
                            break;
                        case 5:
                            transformedData[key].GolV += row.Tunai + row.DinasOpr + row.DinasMitra + row.DinasKary + row.eMandiri + row.eBri + row.eBni + row.eBca + row.eNobu + row.eDKI + row.eMega + row.eFlo;
                            break;
                        default:
                            break;
                    }
                });

                setData(Object.values(transformedData));
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

    const handleFiltered = () => {
        setLoading(true);
        setTimeout(() => {
            try {
                const newData = data.filter(item => {
                    const textFilterPasses = filterText === "" ||
                        [item.Tanggal].some(
                            field => field.toString().toLowerCase().includes(filterText.toLowerCase())
                        );

                    const dateFilterPasses = filterDate === "" ||
                        new Date(item.Tanggal).toDateString() === new Date(filterDate).toDateString();

                    return textFilterPasses && dateFilterPasses;
                });
                setFilteredData(newData);
            } catch (error) {
                console.error("Error filtering data:", error);
            } finally {
                setLoading(false);
            }
        }, 1000);
    };

    const handleReset = () => {
        setFilterText("");
        setFilterDate("");
        setLoading(true);
        setTimeout(() => {
            try {
                setFilteredData(data);
                router.replace('/report/daily');
            } catch (error) {
                console.error("Error filtering data:", error);
            } finally {
                setLoading(false);
            }
        }, 1000);
    };

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            let filtered;
            switch (selectedMethod) {
                case 'tunai':
                    filtered = data.filter(item => item.MetodePembayaran === 'Tunai');
                    break;
                case 'toll':
                    filtered = data.filter(item => item.MetodePembayaran === 'E-toll');
                    break;
                case 'fio':
                    filtered = data.filter(item => item.MetodePembayaran === 'fio');
                    break;
                case 'ktp':
                    filtered = data.filter(item => item.MetodePembayaran === 'ktp');
                    break;
                case 'total':
                    filtered = data;
                    break;
                case 'total2':
                    filtered = data.filter(item => ['Tunai', 'E-toll', 'fio'].includes(item.MetodePembayaran));
                    break;
                default:
                    filtered = data;
            }
            setFilteredData(filtered);
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [selectedMethod, data]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Laporan lalin per hari</CardTitle>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent>
                <div className="flex items-center gap-5 my-5">
                    <Input type="search" placeholder="Cari..." className="w-1/4 inline-block" value={filterText} onChange={(e) => setFilterText(e.target.value)} />
                    <Input type="date" className="w-1/4 inline-block" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} />
                    <div className="flex items-center justify-end gap-3">
                        <Button onClick={handleFiltered}>Filter</Button>
                        <Button variant="outline" onClick={handleReset}>Reset</Button>
                    </div>
                </div>
                <Separator />
                <div className="flex justify-end my-5">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                <TiExportOutline className="text-xl mr-1" />
                                Export
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end">
                            <DropdownMenuLabel>Choose an Option :</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    Excel
                                    <DropdownMenuShortcut><RiFileExcel2Line className="text-xl" /></DropdownMenuShortcut>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    PDF
                                    <DropdownMenuShortcut><FaRegFilePdf className="text-xl" /></DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <Tabs value={selectedMethod} onValueChange={setSelectedMethod} className="w-full">
                    <TabsList>
                        <TabsTrigger value="tunai">Total Tunai</TabsTrigger>
                        <TabsTrigger value="toll">Total E-Toll</TabsTrigger>
                        <TabsTrigger value="fio">Total FIo</TabsTrigger>
                        <TabsTrigger value="ktp">Total KTP</TabsTrigger>
                        <TabsTrigger value="total">Total Keseluruhan</TabsTrigger>
                        <TabsTrigger value="total2">Total E-Toll+Tunai+FIo</TabsTrigger>
                    </TabsList>
                    <TabsContent value={selectedMethod}>
                        {loading ? (
                            <Loading />
                        ) : (
                            <DataTable columns={columns} data={data} />
                        )}
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
