import { parseAsync, success } from "zod";
import db_mysql from "../../database/base_mysql.js";
import dateTime from "../../utils/dateTime.js";
import { mostrar } from "../../utils/mostrar.js";

export class commentsModel {
    static async create( body ){
        const { producto_id, usuario_id, comentario } = body
        const time = dateTime()
        try {
            await db_mysql.query(`
                    INSERT INTO comentarios ( producto_id, usuario_id, comentario, created_at )
                    VALUES( ?, ?, ?, ? )
                `,
            [producto_id, usuario_id, comentario, time])
            return {
                success: true,
                message: "El comentario fue creado correctamente"
            }
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static async getAll(){
        try {
            let [commentarios] = await db_mysql.query('SELECT c.id,  c.usuario_id, c.comentario FROM comentarios as c')
            return {
                success: true,
                message: "Mensajes encontrados",
                data: commentarios
            }
        } catch (error) {
            return {
                success: false,
                message: "Error al buscar los mensajes"
            }
        }
    }

    static async edit( id, body ){
        try {
             let query = "UPDATE comentarios SET"
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
            const [commentariosEditado] = await db_mysql.query( query, params )
            if( commentariosEditado.affectedRows == 0 ){
                return {
                    success: false,
                    message: "Comentario no encontrado"
                }
            }
            return {
                success: true,
                message: "El comentario fue editado"
            }
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static async delete(id) {
        try {
             let query = "UPDATE comentarios SET edit_at = ?, deleted_at = ? WHERE id = ?"
            let params = []
            let datetime = dateTime()
            params.push(datetime)
            params.push(datetime)
            params.push(id)
            const [commentariosEliminado] = await db_mysql.query( query, params )
            if( commentariosEliminado.affectedRows == 0 ){
                return {
                    success: false,
                    message: "Comentario no encontrado"
                }
            }
            return {
                success: true,
                message: "El comentario fue eliminado"
            }
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }
}