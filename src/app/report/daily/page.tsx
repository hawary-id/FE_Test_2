"use client"
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
import { DataTable } from "./datatable";

export default function Daily() {
    const [filterText, setFilterText] = useState("");
    const [filterDate, setFilterDate] = useState('');
    const [data, setData] = useState<Lalin[]>(LALIN_DATA);
    const [loading, setLoading] = useState(false);
    const [filteredData, setFilteredData] = useState(data);
    const [selectedMethod, setSelectedMethod] = useState('tunai');
    const router = useRouter();

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
                const newData = LALIN_DATA.filter(item => {
                    const textFilterPasses = filterText === "" ||
                        [item.ruas_nama, item.gerbang_nama, item.gardu].some(
                        field => field.toLowerCase().includes(filterText.toLowerCase())
                        );
                  
                    const dateFilterPasses = filterDate === "" ||
                        new Date(item.tanggal).toDateString() === new Date(filterDate).toDateString();
                    return textFilterPasses && dateFilterPasses;
                  });
                setData(newData);
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
                setData(LALIN_DATA);
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
              filtered = data.filter(item => item.metode_pembayaran === 'Tunai');
              break;
            case 'toll':
              filtered = data.filter(item => item.metode_pembayaran === 'E-toll');
              break;
            case 'fio':
              filtered = data.filter(item => item.metode_pembayaran === 'fio');
              break;
            case 'ktp':
              filtered = data.filter(item => item.metode_pembayaran === 'ktp');
              break;
            case 'total':
              filtered = data;
              break;
            case 'total2':
              filtered = data.filter(item => ['Tunai', 'E-toll', 'fio'].includes(item.metode_pembayaran));
              break;
            default:
              filtered = data;
          }
          setFilteredData(filtered);
          setLoading(false);
        }, 500);
    
        return () => clearTimeout(timer);
      }, [selectedMethod, data]);


    return(
        <Card>
            <CardHeader>
                <CardTitle>Laporan lalin per hari</CardTitle>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <Separator/>
            <CardContent>
                <div className="flex items-center gap-5 my-5">
                    <Input type="search" placeholder="Cari..." className="w-1/4 inline-block" value={filterText} onChange={(e) => setFilterText(e.target.value)}/>
                    <Input type="date" className="w-1/4 inline-block" value={filterDate} onChange={(e) => setFilterDate(e.target.value)}/>
                    <div className="flex items-center justify-end gap-3">
                        <Button onClick={handleFiltered}>Filter</Button>
                        <Button variant="outline" onClick={handleReset}>Reset</Button>
                    </div>
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
                        <DataTable columns={columns} data={filteredData} />
                        )}
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
}