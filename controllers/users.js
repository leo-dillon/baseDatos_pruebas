import { UserModel } from "../model/mysql/user.js";
import { parcialValidateUsers, validateUsers } from "../schemas/users.js";
import dateTime from "../utils/dateTime.js";
import { mostrar } from "../utils/mostrar.js";
import ZodErrorFormat from "../utils/zodErrorFormat.js";

export class userController {
    static async create ( req, res ){
        const resultValidate = validateUsers( req.body )
        if( resultValidate.success ){ 

            let createUser = await UserModel.create( resultValidate.data )
            if( createUser.status ) return res.status( 201 ).json({ message: createUser.message })
            res.status( 422 ).json({ message: createUser.message })
        
        } else {
        
            let errorMessage = ZodErrorFormat( resultValidate.error.format() )
            return res.status( 400 ).json({ message: errorMessage })
        
        }
    }

    static async getAll( req, res ){
        let { name }   = req.query
        let users = await UserModel.getAll({ name })
        if( users.success ){
            return res.status(200).json({
                message: users.message,
                data: users.data
            })
        } else {
            return res.status(400).json({
                message: users.message
            })
        }
    }

    static async edit( req, res ){
        const { id } = req.query
        const resultValidate = parcialValidateUsers( req.body )
        if( resultValidate.error ) { 
            return res.status(400).json({ message: "Error al querer editar el usuario" })
        }
        const user = await UserModel.edit( id, resultValidate.data )
        if( user.success ) return res.status( 200 ).json({ message: user.message })
        return res.status(400).json({ message: user.message })
    }  

    static async delete( req, res ){
        const { id } = req.body
        const responseDelete = await UserModel.delete(id)
        if( responseDelete.success ){
            return res.status(200).json({
                message: 'El usuario fue eliminado correctamente'
            })
        }
        return res.status(404).json({
            message: 'Error al eliminar el usuario',
            error: responseDelete.message   
        })

    }

    static async clear( req, res ){
        const responseClear = await UserModel.clear()

        if( responseClear.success ){
            return res.status(200).json({ message: "Los usuarios fueron limpiados" })
        }
        return res.status(404).json({
            message: "Error al limpiar los usuarios",
            error: responseClear.error
        })
    }
}