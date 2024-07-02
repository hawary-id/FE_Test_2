import {z} from 'zod';

export const gateFormSchema = z.object({
    ruas_id: z.number({required_error: 'Ruas tidak boleh kosong'}),
    ruas_nama: z.string({required_error: 'Nama ruas tidak boleh kosong'}),
    gerbang_id: z.number({required_error: 'Gerbang tidak boleh kosong'}),
    gerbang_nama: z.string({required_error: 'Nama gerbang tidak boleh kosong'}),
})

export const signInFormSchema = z.object({
    username: z.string({required_error: 'username harus diisi'}),
    password: z.string({required_error: 'Password harus diisi'}),
})