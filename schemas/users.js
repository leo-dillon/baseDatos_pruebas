import z from "zod";

const usersSchemas = z.object({
    name: z.string().trim()
        .min(2, "El nombre debe tener más de 2 caracteres.")
        .max(60, "El nombre no puede superar los 60 caracteres"),
    password: z.string()
        .min(5, "La contraseña debe tener más de 5 caracteres")
        .max(128, "La contraseña no puede superar los 100 caracteres")
        .regex(/[a-zA-Z]/, "La contraseña debe contener letras")
})

function validateUsers( object ){
    return usersSchemas.safeParse( object )
}

export { validateUsers }