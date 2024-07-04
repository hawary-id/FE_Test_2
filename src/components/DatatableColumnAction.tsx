import React, { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { IoMdMore } from "react-icons/io"
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogCancel, AlertDialogAction, AlertDialogTitle, AlertDialogDescription } from "@/components/ui/alert-dialog"
import { useAppContext } from '@/context/useAppContext';
import { useToast } from './ui/use-toast';
import { useRouter } from 'next/navigation';

type Props = {
    id: number;
    IdCabang: number;
};

export function DatatableColumnAction({id,IdCabang}: Props) {
  const { token } = useAppContext();
  const { toast } = useToast();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async (id: number, IdGerbang: number) => {
    const data = {
      "id": id,
      "IdCabang": IdGerbang,
    }
    try {
      const response = await fetch('http://localhost:8080/api/gerbangs/', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
            title: "Sukses",
            description: "Data berhasil dihapus",
        });
        setIsOpen(false);
        router.refresh();
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
  }
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <IoMdMore className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/gate/edit/${id}/${IdCabang}`}>Edit</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/gate/show/${id}`}>View</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className='text-destructive cursor-pointer' onClick={() => setIsOpen(!isOpen)}>Hapus</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Apakah Anda Yakin ingin Menghapus Data Ini?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak bisa dibatalkan. Tindakan ini akan menghapus data dari server secara permanen.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleDelete(id,IdCabang)} className='bg-destructive hover:bg-destructive/90'>Iya, Hapus</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    )
}