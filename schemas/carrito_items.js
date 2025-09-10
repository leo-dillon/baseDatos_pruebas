import z from "zod"

const carritoItemsSchemas = z.object({
    carrito_id: z.string().uuid({message: "El carrito_id debe ser un uuid valido"}),
    producto_id: z.string().uuid({message: "El producto_id debe ser un uuid valido"}),
    cantidad: z.number().nonnegative("La cantidad debe ser mayor a 0")
})

function validateCarritoItems( object ){
    return carritoItemsSchemas.safeParse( object )
}

function validateParcialCarritoItems( object ){
    return carritoItemsSchemas.partial().safeParse( object )
}

export { validateCarritoItems, validateParcialCarritoItems }