import { success } from "zod";
import { commentsModel } from "../model/mysql/comments.js";
import { parcialValidateComentario, validateComentario } from "../schemas/comments.js";
import ZodErrorFormat from "../utils/zodErrorFormat.js";
import { mostrar } from "../utils/mostrar.js";

export class commentsController{
    static async create( req, res ){
        let commentsValidate = validateComentario( req.body )
        if( commentsValidate.success ){
            let createComentario = await commentsModel.create( commentsValidate.data )
            if( createComentario.success ){
                return res.status(200).json({
                    message: createComentario.message
                })
            }
            return res.status(404).json({
                message: createComentario.message
            })

        }
        let errorMessage = ZodErrorFormat(commentsValidate.error.format() )
        return res.status(403).json({
            message: errorMessage
        })
    }

    static async getAll( req, res ){
        let getComentarios = await commentsModel.getAll()
        if( getComentarios.success ){
            return res.status(200).json({
                message: "Mensajes encontrados",
                data: getComentarios.data
            })
        }
        return res.status(404).json({
            message: "Error al buscar los mensajes"
        })
    }

    static async edit( req, res ){
        let { id } = req.params
        let comentarioValidado = parcialValidateComentario( req.body )
        if( comentarioValidado.success ){
            const comentarioEditado = await commentsModel.edit( id, comentarioValidado.data )
            if( comentarioEditado.success ){
                return res.status(200).json({
                    message: "Comentario editado correctamente"
                })    
            }
            return res.status(500).json({
                message: "Error al querer editar el comentario",
                error: comentarioEditado.message
            })
        }
        return res.status(403).json({
            message: ZodErrorFormat( comentarioValidado.error.format() )
        })
    }

    static async delete( req, res ){
        let { id } = req.params
        let comentarioEliminado = await commentsModel.delete( id )
        if( comentarioEliminado.success ){
            return res.status(200).json({
                message: comentarioEliminado.message
            })
        }
        return res.status(404).json({
            message: comentarioEliminado.message
        })
    }
}