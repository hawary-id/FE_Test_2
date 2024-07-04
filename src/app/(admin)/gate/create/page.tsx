"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useAppContext } from "@/context/useAppContext";
import { gateFormSchema } from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface CreateGateProps {

}

export default function Create() {
    const { token } = useAppContext();
    const form = useForm<z.infer<typeof gateFormSchema>>({
        resolver: zodResolver(gateFormSchema)
    })
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token){
            router.push('/signin')
        }
    },[])

    const onSubmit = async (data: z.infer<typeof gateFormSchema>) => {
        try {
          const response = await fetch('http://localhost:8080/api/gerbangs', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
          });
    
          if (response.ok) {
            toast({
                title: "Sukses",
                description: "Data berhasil disimpan",
            });
            router.push('/gate');
          } else {
            const errorData = await response.json();
            toast({
                variant: "destructive",
                title: "Failed",
                description: errorData.message || "Terjadi kesalahan",
            });
          }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Terjadi kesalahan",
                description: "Gagal terhubung ke server",
            });
            console.error('Terjadi kesalahan:', error);
        }
      };

    return (
        <div className="flex w-full justify-center py-10">
            <Card className="w-full md:w-1/3">
                <form onSubmit={form.handleSubmit(onSubmit)}>            
                    <CardHeader>
                        <CardTitle>Buat Data Gerbang</CardTitle>
                        <CardDescription>Buat Data Gerbang Baru</CardDescription>
                    </CardHeader>
                    <Separator/>

                    <CardContent>
                        <Form {...form}>
                            <div className="mb-5">
                                <FormField
                                    control={form.control}
                                    name="id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>ID</FormLabel>
                                            <FormControl>
                                                <Input type="number"    
                                                    placeholder="ID"
                                                    {...field}
                                                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="mb-5">
                                <FormField
                                    control={form.control}
                                    name="IdCabang"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>ID Cabang</FormLabel>
                                            <FormControl>
                                                <Input type="number"
                                                    placeholder="ID Cabang"
                                                    {...field}
                                                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="mb-5">
                                <FormField
                                    control={form.control}
                                    name="NamaCabang"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nama Ruas</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Nama Ruas" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="mb-5">
                                <FormField
                                    control={form.control}
                                    name="NamaGerbang"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nama Gerbang</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Nama Gerbang" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                        </Form>
                    </CardContent>
                    <CardFooter className="flex items-center w-full justify-end gap-3">
                        <Button variant="outline" asChild>
                            <Link href="/gate">Batal</Link>
                        </Button>
                        <Button type="submit">Simpan</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}