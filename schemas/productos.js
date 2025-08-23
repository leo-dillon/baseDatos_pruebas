import z from "zod";

const productSchema = z.object({
    id: z.number().int().positive(), 
    title: z.string().min(1), 
    price: z.number().nonnegative(), 
    description: z.string().min(10), 
    category: z.string().min(1), 
    image: z.string().url(), 
    rating: z.object({
        rate: z.number().min(0).max(5), 
        count: z.number().int().nonnegative() 
    })
});

function parcialValidateProduct(object){
    return productSchema.partial().safeParse(object)
} 

function validateProduct(object){
    return productSchema.safeParse(object)
}

export { validateProduct, parcialValidateProduct } 