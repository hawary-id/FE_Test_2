"use client"
import { DataTable } from "@/components/Datatable";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GARDU_DATA, GERBANG_DATA, LALIN_DATA, RUAS_DATA } from "@/lib/constant";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegFilePdf } from "react-icons/fa";
import { RiFileExcel2Line } from "react-icons/ri";
import { TiExportOutline } from "react-icons/ti";
import Select from 'react-select';
import { Lalin, columns } from "./columns";

export default function Daily() {
    const [selectedRuas, setSelectedRuas] = useState("");
    const [selectedGerbang, setSelectedGerbang] = useState("");
    const [selectedGardu, setSelectedGardu] = useState("");
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [data, setData] = useState<Lalin[]>(LALIN_DATA);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const ruasOptions = RUAS_DATA.map(item => ({
        value: item.nama,
        label: item.nama
    }));

    const gerbangOptions = GERBANG_DATA.map(item => ({
        value: item.nama,
        label: item.nama
    }))

    const garduOptions = GARDU_DATA.map(item => ({
        value: item.nama,
        label: item.nama
    }))

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                await new Promise(resolve => setTimeout(resolve, 2000));
                const initialData = LALIN_DATA;
                setData(initialData);
            } catch (error) {
                console.error("Error fetching initial data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleFiltered = () => {
        setLoading(true);
        setTimeout(() => {
            try {
                const newData = LALIN_DATA.filter(item => (
                    (selectedRuas === "" || item.ruas_nama.toLowerCase().includes(selectedRuas.toLowerCase())) &&
                    (selectedGerbang === "" || item.gerbang_nama.toLowerCase().includes(selectedGerbang.toLowerCase())) &&
                    (selectedGardu === "" || item.gardu.toLowerCase().includes(selectedGardu.toLowerCase())) &&
                    (startDate === "" || new Date(item.tanggal) >= new Date(startDate)) &&
                    (endDate === "" || new Date(item.tanggal) <= new Date(endDate))
                ));
                setData(newData);
            } catch (error) {
                console.error("Error filtering data:", error);
            } finally {
                setLoading(false);
            }
        }, 1000);
    };

    const handleReset = () => {
        setSelectedRuas("");
        setSelectedGerbang("");
        setSelectedGardu("");
        setStartDate("");
        setEndDate("");
        setLoading(true);
        setTimeout(() => {
            try {
                setData(LALIN_DATA);
                router.replace('/report/daily');
            } catch (error) {
                console.error("Error filtering data:", error);
            } finally {
                setLoading(false);
            }
        }, 1000);
    };


    return(
        <Card>
            <CardHeader>
                <CardTitle>Laporan lalin per hari</CardTitle>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <Separator/>
            <CardContent>
                <div className="grid grid-cols-5 gap-5 mb-5">
                    <Select
                        options={ruasOptions}
                        isClearable
                        placeholder="Pilih Ruas"
                        value={ruasOptions.find(option => option.value === selectedRuas) || null}
                        onChange={(selectedOption) => setSelectedRuas(selectedOption ? selectedOption.value : "")}
                    />
                    <Select
                        options={gerbangOptions}
                        isClearable
                        placeholder="Pilih Gerbang"
                        value={gerbangOptions.find(option => option.value === selectedGerbang) || null}
                        onChange={(selectedOption) => setSelectedGerbang(selectedOption ? selectedOption.value : "")}
                    />
                    <Select
                        options={garduOptions}
                        isClearable
                        placeholder="Pilih Gardu"
                        value={garduOptions.find(option => option.value === selectedGardu) || null}
                        onChange={(selectedOption) => setSelectedGardu(selectedOption ? selectedOption.value : "")}
                    />
                    <Input type="date" className="w-full inline-block" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
                    <Input type="date" className="w-full inline-block" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
                </div>
                <div className="flex items-center justify-end gap-3 mb-5">
                    <Button onClick={handleFiltered}>Filter</Button>
                    <Button variant="outline" onClick={handleReset}>Reset</Button>
                </div>
                <Separator/>
                <div className="flex justify-end my-5">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            <TiExportOutline className="text-xl mr-1"/>
                            Export</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end">
                        <DropdownMenuLabel>Choose an Option :</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                Excel
                                <DropdownMenuShortcut><RiFileExcel2Line className="text-xl"/></DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                PDF
                                <DropdownMenuShortcut><FaRegFilePdf className="text-xl"/></DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        
                    </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <Tabs defaultValue="tunai" className="w-full">
                    <TabsList>
                        <TabsTrigger value="tunai">Total Tunai</TabsTrigger>
                        <TabsTrigger value="toll">Total E-Toll</TabsTrigger>
                        <TabsTrigger value="fio">Total FIo</TabsTrigger>
                        <TabsTrigger value="ktp">Total KTP</TabsTrigger>
                        <TabsTrigger value="total">Total Keseluruhan</TabsTrigger>
                        <TabsTrigger value="total2">Total E-Toll+Tunai+FIo</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tunai">
                        {loading ? (
                            <Loading/>
                        ):(
                            <DataTable columns={columns} data={data} />
                        )}
                    </TabsContent>
                    <TabsContent value="toll">Total E-Toll</TabsContent>
                    <TabsContent value="fio">Total FIo</TabsContent>
                    <TabsContent value="ktp">Total KTP</TabsContent>
                    <TabsContent value="total">Total Keseluruhan</TabsContent>
                    <TabsContent value="total2">Total E-Toll+Tunai+FIo</TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
}