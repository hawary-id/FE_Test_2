"use client"
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LALIN_DATA } from "@/lib/constant";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegFilePdf } from "react-icons/fa";
import { RiFileExcel2Line } from "react-icons/ri";
import { TiExportOutline } from "react-icons/ti";
import { Lalin, columns } from "./columns";
import { DataTable } from "./datatable";
import { useAppContext } from "@/context/useAppContext";

interface LalinData0 {
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

    const CLUSTER_PEMBAYARAN = {
        eMandiri: "E-Toll",
        eBri: "E-Toll",
        eBni: "E-Toll",
        eBca: "E-Toll",
        eNobu: "E-Toll",
        eDKI: "E-Toll",
        eMega: "E-Toll",
        eFlo: "Flo",
        Tunai: "Tunai",
    };

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token){
            router.push('/signin')
        }
    },[])


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
                const transformedData: LalinData[] = [];

                responseData.data.rows.rows.forEach((row: LalinData) => { // Explicitly type the row as LalinData
                    const tanggal = row.Tanggal.split("T")[0];
            
                    for (const metode in CLUSTER_PEMBAYARAN) {
                      const cluster = CLUSTER_PEMBAYARAN[metode];
            
                      // Ensure type safety when accessing row properties
                      const metodeLowerCase = cluster.toLowerCase() as keyof LalinData;
            
                      transformedData.push({
                        Tanggal: tanggal,
                        Hari: new Date(tanggal).toLocaleDateString('id-ID', { weekday: 'long' }),
                        MetodePembayaran: cluster,
                        GolI: row.Golongan === 1 ? row[metodeLowerCase] : 0,
                        GolII: row.Golongan === 2 ? row[metodeLowerCase] : 0,
                        GolIII: row.Golongan === 3 ? row[metodeLowerCase] : 0,
                        GolIV: row.Golongan === 4 ? row[metodeLowerCase] : 0,
                        GolV: row.Golongan === 5 ? row[metodeLowerCase] : 0,
                        Total: row[metodeLowerCase],
                      });
                    }
                });

            setData(transformedData);
            
          } catch (error) {
            console.error('Error fetching lalins data:', error);
          } finally {
            setLoading(false);
          }
        };

        if (token) {
          fetchLalinsData();
        }
    }, [token,activeFilterDate]);

    console.log(data)

    const handleFiltered = () => {
        setLoading(true);
        setTimeout(() => {
            try {
                const newData = data.filter(item => {
                    const textFilterPasses = filterText === "" ||
                        [item.IdCabang, item.IdGerbang].some(
                        field => field.toString().includes(filterText.toLowerCase())
                        );
                  
                    const dateFilterPasses = filterDate === "" ||
                        new Date(item.Tanggal).toDateString() === new Date(filterDate).toDateString();
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
                setData(data);
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
                        <DataTable columns={columns} data={data} />
                        )}
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
}