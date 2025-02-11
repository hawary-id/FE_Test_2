'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { signInFormSchema } from '@/lib/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface IpageProps {}

export default function signInPage() {
    const form = useForm<z.infer<typeof signInFormSchema>>({
        resolver: zodResolver(signInFormSchema),
    })
    const router = useRouter();
    const { toast } = useToast()

    const onSubmit = async (val: z.infer<typeof signInFormSchema>) => {
        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(val),
            });
    
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                router.push('/');
            } else {
                const errorData = await response.json();
                toast({
                    variant: "destructive",
                    title: "Login failed",
                    description: errorData.message || "Terjadi kesalahan",
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Terjadi kesalahan",
                description: "Gagal terhubung ke server",
            });
            console.error('An error occurred:', error);
        }
    };

    
    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token){
            router.push('/')
        }
    },[])
    
   
      
    return (
        <div className='flex items-center'>
            <div className="w-full md:w-1/2 bg-white h-screen py-5 md:py-10 px-5 md:px-44 flex flex-col justify-center">
                <div className="flex justify-center mb-3">
                    <img src='/images/logo-jm.png' className='h-16 w-fit' alt=""/>
                </div>
                <h1 className="text-2xl font-bold mb-3 text-center text-primary">Login Account</h1>
                <p className="text-gray-500 mb-12 text-center font-light text-sm">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum optio cum velit corrupti, ea a necessitatibus ullam unde quae fuga ad natus officiis debitis quis veritatis sed fugiat vero consectetur.</p>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="mb-5">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="Username" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                />
                        </div>
                        <div className="mb-5">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input type="password" placeholder="Password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                />
                        </div>
                        <Button className='w-full rounded-full' type="submit">Sign In</Button>
                    </form>
                </Form>

            </div>
            <div className="hidden md:block w-1/2 bg-signin h-screen bg-cover bg-center"></div>
        </div>
   );
}