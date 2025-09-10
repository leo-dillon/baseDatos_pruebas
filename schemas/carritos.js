import z from "zod";

const carritosSchemas = z.object({
    usuario_id: z.string().uuid({ message: "El usuario_id debe ser un uuid valido " }) 
})

function validateCarritos ( object ){
    return carritosSchemas.safeParse( object )
}

export { validateCarritos }