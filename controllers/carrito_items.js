import { carritoItemsModel } from "../model/mysql/carrito_items.js";
import { validateParcialCarritoItems } from "../schemas/carrito_items.js";
import { mostrar } from "../utils/mostrar.js";
import ZodErrorFormat from "../utils/zodErrorFormat.js";


export class carritoItemsController {
    static async create(req,res){
        const carritoItemsValidate = validateParcialCarritoItems(req.body)
        if( carritoItemsValidate.success ){
            
            try {
                const createCarritoItems = await carritoItemsModel.create( carritoItemsValidate.data )
                if( createCarritoItems.success ){
                    return res.status(200).json({
                        message: createCarritoItems.message
                    })
                } 
                return res.status(404).json({
                    message: createCarritoItems.message
                })
            } catch (error) {
                return res.status(500).json({
                    message: error.message
                })
            }

        }
        const errorMessage = ZodErrorFormat( carritoItemsValidate.error.format() )
        return res.status(403).json({
            message: errorMessage
        })
    }

    static async getAll(req,res){
        try {
            let carritoItemsGetAll = await carritoItemsModel.getAll()
            return res.status(200).json({
                message: "Items encontrados dentro de carritos",
                data: carritoItemsGetAll.data
            })
        } catch (error) {
            
        }
    }
}