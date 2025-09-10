import { success } from "zod";
import db_mysql from "../../database/base_mysql.js";
import dateTime from "../../utils/dateTime.js";
import { mostrar } from "../../utils/mostrar.js";

export class addressesModel {
    static async create( body ){
        const { usuario_id, calle, ciudad, provincia, codigo_postal } = body
        const time = dateTime()
        if( !(usuario_id && calle && ciudad && provincia && codigo_postal) ){
            return {
                success: false,
                message: "Error en los datos enviados"
            }
        }
        try {
            await db_mysql.query(
                `INSERT INTO direcciones ( usuario_id, calle, ciudad, provincia, codigo_postal, created_at )
                VALUES( ?, ?, ?, ?, ?, ? )`,
                [ usuario_id, calle, ciudad, provincia, codigo_postal, time ]
            )
            return {
                success: true,
                message: "La dirección fue creada correctamente"
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
            const query = `
                SELECT d.id, d.usuario_id, calle, ciudad, provincia, codigo_postal FROM direcciones as d
            `
            const [ addressesData ] = await db_mysql.query( query )
            return {
                success: true,
                message: "Direcciones encontradas",
                data: addressesData
            }
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static async edit( id, body ){
        try {
            let query = "UPDATE direcciones SET"
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
                    message: "La direccion no fue encontrado"
                }
            }
            return {
                success: true,
                message: "La direccion se edito correctamente"
            }
        } catch (error) {
            return {
                success: false,
                message: "Error al querer editar La direccion"
            }
        }
    }

    static async delete( id ){
        const query = `UPDATE direcciones SET edit_at = ?, deleted_at = ? WHERE id = ?`
        const time = dateTime()
        const params = [time, time, id]
        try {
            const addressesDelete = await db_mysql.query( query, params )
            if(addressesDelete.affectedRows == 0){
                return {
                    success: false,
                    message: "Error al querer eliminar la dirección"
                }
            }
            return {
                success: true,
                message: "La dirección fue borrada correctamente"
            }
        } catch (error) {
            return {
                success: false,
                message: error.message  
            }
        }
    }
}