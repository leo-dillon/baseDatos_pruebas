import { success } from "zod";
import db_mysql from "../../database/base_mysql.js"
import bcrypt from 'bcrypt';
import { mostrar } from "../../utils/mostrar.js";
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

    static async edit( id, body ){
        try {
            mostrar( body )
            let query = "UPDATE users SET"
            let params = []
            let campos = []
            for (const key in body) {
                campos.push(` ${key} = ? `)
                params.push( body[ key ] )
            }
            query += `${campos.join(', ')} WHERE id = ?`
            params.push(id)
            const [ usuarioEditado ] = await db_mysql.query( query, params )
            if( usuarioEditado.affectedRows == 0 ){
                return {
                    success: false,
                    message: "El usuario no fue encontrado"
                }
            }
            return {
                success: true,
                message: "El usuario se edito correctamente"
            }
        } catch (error) {
            return {
                success: false,
                message: "Error al querer editar el usuario"
            }
        }
    }
}