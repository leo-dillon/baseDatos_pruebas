import db_mysql from "../../database/base_mysql.js"
import bcrypt from 'bcrypt';
const salt = 10


export class UserModel {
    static async create( body ){
        const { name, password } = body
        if( name.length < 3 && password.length < 3 ) return {
            success: false,
            message: "Los datos enviados no cumplen con lo pedido."
        }

        try {
            const passwordHash = await bcrypt.hash( password, salt)
            await db_mysql.query( 
                `INSERT INTO users ( username, password ) 
                VALUES ( ?, ? )`,
                [name, passwordHash]
            )
            return { status: true, message: "El usuario fue creado correctamente." }
        } catch (error) {
            if( error.code == "ER_DUP_ENTRY" ){
                return { success: false, message: "El usuario ya existe"} 
            }
            return { success: false, message: error.message }
        }
    }

    static async getAll({ name }){
        let query = `
                SELECT * FROM users    
            `
        let params = []
        try {
            if ( name ){
                query += " WHERE users.username LIKE CONCAT ( '%', ?, '%')"
                params.push( name )
            }
            let [ usersResponse ] = await db_mysql.query(query, params)
            return {
                success: true,
                message: "Usuarios encontrados",
                data: usersResponse
            }
        } catch (error) {
            return {
                success: false,
                message: "Error al buscar usuarios"
            }
        }
    }

    static async edit({ body }){
        
    }
}