import z from "zod";

const addressesSchemas = z.object({
    usuario_id: z.string().uuid({message: "El usuario_id debe ser un uuid valido"}),
    calle: z.string()
        .min(3,     {message: "La calle debe tener como minímo 3 caracteres"})
        .max(100,   {message: "La calle debe tener como maxímo 100 caracteres"}),
    ciudad: z.string()
        .min(3,     {message: "La ciudad debe tener como minímo 3 caracteres"})
        .max(100,   {message: "La ciudad debe tener como maxímo 100 caracteres"}),
    provincia: z.string()
        .min(3,     {message: "La provincia debe tener como minímo 3 caracteres"})
        .max(100,   {message: "La provincia debe tener como maxímo 100 caracteres"}),
    codigo_postal: z.string()
        .min(3,     {message: "El código postal debe tener como minímo 3 caracteres"})
        .max(100,   {message: "El código postal debe tener como maxímo 100 caracteres"})
})

function validateAddress( object ){
    return addressesSchemas.safeParse( object )
}

function validateParcialAddress( object ){
    return addressesSchemas.partial().safeParse( object )
}

export { validateAddress, validateParcialAddress }