import { carritoModel } from "../model/mysql/carritos.js";
import { validateCarritos } from "../schemas/carritos.js";
import ZodErrorFormat from "../utils/zodErrorFormat.js";

export class carritoController{
    static async create(req,res){
        const carritoValidation = validateCarritos( req.body )
        if( carritoValidation.success ){
            try {
                const createCarrito = await carritoModel.create( carritoValidation.data )
                if( createCarrito.success ){
                    return res.status(200).json({
                        message: createCarrito.message
                    })
                }
                return res.status(403).json({
                    message: createCarrito.message
                })
            } catch (error) {
                return res.status(500).json({
                    message: "Error al crear un carrito"
                })
            }
        }
        const messageError = ZodErrorFormat( carritoValidation.error.format() )
        return res.status(403).json({
            message: messageError
        })
    }

    static async getAll(req, res){
        try {
            const getAllCarritos = await carritoModel.getAll()
            if( getAllCarritos.success ){
                return res.status(200).json({
                    data: getAllCarritos.data,
                    message: "Estos son los carritos encontrados"
                })
            }
            return res.status(404).json({
                message: "Error al momento de buscar los carritos"
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    }

    static async getByUserId(req,res){

    }
}