import { success } from "zod"
import dateTime from "../../utils/dateTime.js"
import db_mysql from "../../database/base_mysql.js"

export class carritoModel {
    static async create( body ){
        const { usuario_id } = body
        const time = dateTime()
        if( !usuario_id ){
            return {
                success: false,
                message: "Error en los datos enviados"
            }
        }
        try {
            await db_mysql.query(
                `INSERT INTO carritos ( usuario_id, created_at )
                VALUES ( ?, ? )`,
                [ usuario_id, time ]
            )
            return {
                success: true,
                message: "El carrito fue creado correctamente"
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
            const [ dataCarritos ] = await db_mysql.query(
                `SELECT c.id, c.usuario_id FROM carritos as c   `
            )
            return {
                success: true,
                message: "Estos son los carritos encontrados",
                data: dataCarritos
            }
        } catch (error) {
            return {
                success: false,
                message: "Error al buscar los carritosw"
            }
        }
    }

    
}