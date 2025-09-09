import z from "zod";

const rantingsSchemas = z.object({
    rate: z.number().min(0).max(10),
    count: z.number().positive()
})

function validateRatings( object ){
    return rantingsSchemas.safeParse( object )
}

export { validateRatings }