import { success } from "zod"
import db_mysql from "../../database/base_mysql.js"
import dateTime from "../../utils/dateTime.js"

export class carritoItemsModel {
    static async create( body ){
        const { carrito_id, producto_id, cantidad } = body
        let time = dateTime()
        if( !(carrito_id && producto_id && cantidad) ){
            return {
                success: false,
                message: "Error en los datos enviados"
            }
        }
        try {
            const query = `
                INSERT INTO carrito_items (carrito_id, producto_id, cantidad, created_at)
                VALUES (?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE cantidad = cantidad + VALUES(cantidad);
            `
            await db_mysql.query( query, [ carrito_id, producto_id, cantidad, time ] )
            return {
                success: true,
                message: "El producto fue agregado con exito al carrito"
            }
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }
}