import { z } from "zod";

const comentarioSchema = z.object({
  producto_id: z.string()
    .uuid({ message: "El producto_id debe ser un UUID válido" }),

  usuario_id: z.string()
    .uuid({ message: "El usuario_id debe ser un UUID válido" }),

  comentario: z.string()
    .min(1, { message: "El comentario no puede estar vacío" })
    .max(5000, { message: "El comentario no puede superar los 5000 caracteres" }),
});

function validateComentario( object ){
    return comentarioSchema.safeParse( object )
}

function parcialValidateComentario( object ){
    return comentarioSchema.partial().safeParse( object )
}

export { validateComentario, parcialValidateComentario }