import db_mysql from "../../database/base_mysql.js"
import bcrypt from 'bcrypt';
import dateTime from "../../utils/dateTime.js";
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
            let query = "UPDATE users SET"
            let params = []
            let campos = []
            let datetime = dateTime()
            for (const key in body) {
                campos.push(` ${key} = ? `)
                params.push( body[ key ] )
            }
            query += `${campos.join(', ')} , edit_at = ? WHERE id = ?`
            params.push(datetime)
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

    static async delete( id ){
        try {
            const res_datetime = dateTime()
            const query = `UPDATE users SET delete_at = ? WHERE id = ?`
            const params = []
            params.push(res_datetime)
            params.push(id)
            const [usuarioEliminado] = await db_mysql.query( query, params )
            if( usuarioEliminado.affectedRows == 0 ){
                return {
                    success: false,
                    message: "El usuario no fue encontrado"
                }
            }
            return {
                success: true,
                message: "El usuario se elimino correctamente"
            }
        } catch (error) {
            return {
                success: false,
                message: "Error al querer eliminar al usuario"
            }
        }
    }


    /**
     * Esto es una acción que lo que hace es eliminar la fecha de eliminación de los usuarios
     * Es para reactivar todos los usuarios
     */
    static async clear(){
        try {
            let query = `
                UPDATE users SET
                delete_at = null
            `
            let [ responseClear ] = await db_mysql.query( query )
            if( responseClear.affectedRows == 0 ){
                return {
                    success: false,
                    message: "El usuario no fue encontrado"
                }
            }
            return {
                success: true,
                message: "Limpieza de usuarios correcta"
            }
        } catch (error) {
            return {
                success: false,
                message: "Error al limpiar los datos"
            }
        }
    }
}