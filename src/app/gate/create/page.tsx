"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { gateFormSchema } from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface CreateGateProps {

}

export default function Create() {
    const form = useForm<z.infer<typeof gateFormSchema>>({
        resolver: zodResolver(gateFormSchema)
    })

    const onSubmit = (val: z.infer<typeof gateFormSchema>) => {
        console.log(val)
    }

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
                                    name="ruas_nama"
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
                                    name="gerbang_nama"
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