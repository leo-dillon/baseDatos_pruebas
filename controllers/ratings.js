import { ratingModel } from "../model/mysql/rating.js";
import { validateRatings } from "../schemas/rating.js";
import { mostrar } from "../utils/mostrar.js";

export class ratingsController {
    static async create( req, res ){
        const bodyValidate = validateRatings( req.body )

        if( bodyValidate.success ){
            try {
                let createrating = await ratingModel.create( bodyValidate.data )
                if( createrating.success ){
                    return res.status(200).json({ 
                        message: "Raitng creado correctamente"
                    })
                }
            } catch (error) {
                return res.status(404).json({
                    message: error.message
                })
            }
        }
        return res.status(404).json({ 
            message: "Error al crear el rating"
        })
    }

    static async getAll( req, res ){
        const ratingsResponse = await ratingModel.getAll()
        if( ratingsResponse.success ){
            return res.status(200).json({
                message: "ratings encontrados",
                data: ratingsResponse.data
            })
        }
        return res.status(404).json({
            message: "Error al buscar los retings"
        })
    }

    static async edit( req, res ){
        const { id } = req.params

        req.body = {
            ... req.body,
            count: 1
        }

        const ratingsValidate = validateRatings( req.body )



        const ratingEdit = await ratingModel.edit(id, ratingsValidate.data)
        if( ratingEdit.success ){
            return res.status(200).json({
                message: "El producto fue editado correctamente",
                data: ratingEdit.data
            })
        }
        return res.status(404).json({
            message: "Error al querer editar el rating"
        })
    }

    static async delete( req, res ){
        const { id } = req.body
        try {
            mostrar(id)
            const deleteRating = await ratingModel.delete( id )
            if( deleteRating.success ){
                return res.status(200).json({
                    message: "El rating fue eliminado"
                })
            }
            return res.status(404).json({
                message: "Error al eliminar el rating"
            })
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    }
}