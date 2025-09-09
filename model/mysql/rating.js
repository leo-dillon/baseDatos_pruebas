import { date } from "zod/v3"
import db_mysql from "../../database/base_mysql.js"
import dateTime from "../../utils/dateTime.js"
import { mostrar } from "../../utils/mostrar.js"

export class ratingModel {
    static async create ( body ){
        const { rate, count } = body
        if( rate < 0 || count != 1 || rate > 10 ){
            return {
                success: true,
                message: "Los datos enviados no cumplen con los paramentros pedidos."
            }
        }
        try {
            await db_mysql.query(
                `INSERT INTO ratings ( rate, count )
                VALUES ( ?, 1 )`,
                [rate, count]
            )
            return { 
                success: true,
                message: "El rating fue creado correctamente"
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
            const [ ratings ] = await db_mysql.query(`
                SELECT r.id, r.rate, r.count 
                    FROM ratings as r
            `)
            return {
                success: true,
                message: "Ratings encontrados.",
                data: ratings
            }
        } catch (error) {
            return {
                success: false, 
                message: "Error al buscar los ratings"
            }
        }
    }

    static async edit( id, body ){
        try {
            const [ ratingAnterior ] = await db_mysql.query(`SELECT r.rate, r.count FROM ratings as r WHERE id = ?`, [id])
            const { rate, count } = ratingAnterior[0]

            const newRate = ( parseFloat(rate) + parseFloat(body.rate) ) / 2
            const newCount = count + 1
            
            let query = "UPDATE ratings SET"
            let params = []
            let campos = []
            let datetime = dateTime()
            for (const key in body) {
                campos.push(` ${key} = ? `)
            }
            query += `${campos.join(', ')} , edit_at = ? WHERE id = ?`
            params.push(newRate)
            params.push(newCount)
            params.push(datetime)
            params.push(id)

            const [ ratingEditado ] = await db_mysql.query( query, params )

            
            if ( ratingEditado.affectedRows == 0 ){
                return {
                    success: false,
                    message: "El rating que quieres editar no existe."
                }
            }
            return {
                success: true,
                message: "El rating fue editado correctamente.",
                data: ratingEditado.data
            }
        } catch (error) {
            return {
                success: false,
                message: "Error al querer editar el rating."
            }
        }
    }

    static async delete( id ){
        try {
            const time = dateTime()
            const query = `UPDATE ratings SET delete_at = ? WHERE id = ?`
            const params = []
            params.push( time )
            params.push( id )
            const [ratingsEliminado] = await db_mysql.query(query, params)
            if( ratingsEliminado.affectedRows == 0 ){
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
}