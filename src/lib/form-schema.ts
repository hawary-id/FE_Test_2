import {z} from 'zod';

export const gateFormSchema = z.object({
    id: z.number({ required_error: 'ID tidak boleh kosong' }),
    IdCabang: z.number({ required_error: 'ID Cabang tidak boleh kosong'}),
    NamaCabang: z.string({required_error: 'Nama ruas tidak boleh kosong'}),
    NamaGerbang: z.string({required_error: 'Nama gerbang tidak boleh kosong'}),
})

export const signInFormSchema = z.object({
    username: z.string({required_error: 'username harus diisi'}),
    password: z.string({required_error: 'Password harus diisi'}),
})