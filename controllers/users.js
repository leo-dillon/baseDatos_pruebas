import { UserModel } from "../model/mysql/user.js";
import { validateUsers } from "../schemas/users.js";
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
}