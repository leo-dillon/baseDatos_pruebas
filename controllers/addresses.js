import { addressesModel } from "../model/mysql/addresses.js";
import { validateAddress, validateParcialAddress } from "../schemas/addresses.js";
import ZodErrorFormat from "../utils/zodErrorFormat.js";

export class addressesController{
    static async create(req,res){
        const addressesValidation = validateAddress(req.body)
        if( addressesValidation.success ){
            const createAddresses = await addressesModel.create( addressesValidation.data )
            if ( createAddresses.success ){
                return res.status(200).json({
                    message: createAddresses.message
                })
            }
            return res.status(404).json({
                message: createAddresses.message    
            }
            )
        }
        const messageError = ZodErrorFormat( addressesValidation.error.format() )
        return res.status(403).json({
            message: messageError
        })
    }

    static async getAll(req,res){
        const getAllAddresses = await addressesModel.getAll()
        if( getAllAddresses.success ){
            return res.status(200).json({
                message: "Direcciones encontradas",
                data: getAllAddresses.data
            })
        }
        return res.status(404).json({
            message: "No se encontraron direcciones"
        })
    }

    static async edit(req,res){
        const addressesValidation = validateParcialAddress(req.body)
        const { id } = req.params
        if( addressesValidation.success ){
            const addressesEditado = await addressesModel.edit(id, addressesValidation.data)
            if( addressesEditado.success ){
                return res.status(200).json({
                    message: addressesEditado.message
                })
            }
            return res.status(404).json({ message: addressesEditado.message })
        }
        let messageError = ZodErrorFormat( addressesValidation.error.format() )
        return res.status(403).json({
            message: messageError
        })
    }

    static async delete(req,res){
        const { id } = req.params
        const addressesEliminado = await addressesModel.delete( id )
        if( addressesEliminado.success ){
            return res.status(200).json({
                message: addressesEliminado.message
            })
        }
        return res.status(404).json({ message: addressesEliminado.message })
    }
}