import {z} from 'zod';

export const productSchema = z.object({
    name: z.string({
        required_error: 'Nombre del producto requerido'
    }),
    price: z.string({
        required_error:'Precio del producto requerido'
    }).optional(),
    year: z.string({
        required_error: 'Año del producto requerido'
    }).optional()
})// fin de productSchema