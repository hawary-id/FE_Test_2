'use client'
import { DataTable } from "@/components/Datatable";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { Lalin, columns } from "./columns";
import { LALIN_DATA } from "@/lib/constant";

export default function Gate() {
    const [data, setData] = useState<Lalin[]>(LALIN_DATA);
    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             setLoading(true);
    //             const response = await fetch('https://ru2dfn54p4.execute-api.ap-southeast-3.amazonaws.com/recruitment/gerbang');
    //             const result = await response.json();
    //             setData(result.data);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchData();
    // }, []);

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
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Master Data Gerbang</CardTitle>
                <CardDescription>Kelola data gerbang</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="w-full flex justify-between items-center mb-8">
                    <Input type="search" placeholder="Cari..." className="w-56" />
                    <Button asChild>
                        <Link href="/gate/create"><IoAdd className="text-xl"/> Tambah</Link>
                    </Button>
                </div>
                <div className="w-full">
                    {loading ? (
                        <Loading/>
                    ) : (
                        <DataTable
                            columns={columns}
                            data={data}
                        />
                    )}
                </div>
            </CardContent>
        </Card>
    )
}