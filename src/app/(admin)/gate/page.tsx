'use client'
import { DataTable } from "@/components/Datatable";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { columns } from "./columns";
import type { Gate } from "./columns";
import { useAppContext } from "@/context/useAppContext";
import { useRouter } from "next/navigation";

export default function Gate() {
    const { token } = useAppContext();
    const router = useRouter();
    const [filterText, setFilterText] = useState("");
    const [data, setData] = useState<Gate[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token){
            router.push('/signin')
        }
    },[])

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/gerbangs', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            });
            
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const result = await response.json();
            setData(result.data.rows.rows);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
        };

        if (token) {
        fetchData();
        }
    }, [token]);

    const filteredData = data.filter((item) => {
        const NamaCabangLower = item.NamaCabang.toLowerCase();
        const NamaGerbangLower = item.NamaGerbang.toLowerCase();
        const filterTextLower = filterText.toLowerCase();
    
        return NamaCabangLower.includes(filterTextLower) || NamaGerbangLower.includes(filterTextLower);
      });
    
        
    return (
        <Card>
            <CardHeader>
                <CardTitle>Master Data Gerbang</CardTitle>
                <CardDescription>Kelola data gerbang</CardDescription>
            </CardHeader>
            <Separator/>
            <CardContent>
                <div className="w-full flex justify-between items-center mt-5 mb-8">
                    <Input type="search" placeholder="Cari..." className="w-56" onChange={(e) => setFilterText(e.target.value)} />
                    <Button asChild>
                        <Link href="/gate/create"><IoAdd className="text-xl"/> Tambah</Link>
                    </Button>
                </div>
                <div className="w-full">
                    {isLoading ? (
                        <Loading />
                    ):(
                        <DataTable columns={columns} data={filteredData} />
                    )}
                </div>
            </CardContent>
        </Card>
    )
}