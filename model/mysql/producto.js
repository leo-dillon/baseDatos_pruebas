import db_mysql from "../../database/base_mysql.js"

export class ProductoModel{
    static async getAll({ category }){
        let query = `
            SELECT p.id, p.title, p.price, p.description, p.category, p.image, r.rate, r.count 
            from productos p 
            LEFT JOIN ratings r ON p.rating_id = r.id `
        let params = []
        if( category ){
            query += ` WHERE p.category = ?`
            params.push( category )
        }
        const [ productos, infoTabla] = await db_mysql.query( query, params )
        
        return productos
    }

    static async getByID({ id }){
        const query = `
            SELECT p.id, p.title, p.price, p.description, p.category, p.image, r.rate, r.count 
            from productos p
            LEFT JOIN ratings r ON p.rating_id = r.id 
            WHERE p.id = ?`
        const params = [id]
        const [ producto, infoTabla ] = await db_mysql.query( query, params )
        return producto
    }

    static async create( body ){
        const { title, price, description, category, image } = body

        try {
            await db_mysql.beginTransaction()
            const [ratingResult] = await db_mysql.query(
            "INSERT INTO ratings (rate, count) VALUES (?, ?)",
            [0, 0]
            )
            const ratingId = ratingResult.insertId
            await db_mysql.query(
            `INSERT INTO productos ( title, price, description, category, image, rating_id) 
            VALUES ( ?, ?, ?, ?, ?, ?)`,
            [ title, price, description, category, image, ratingId]
            )
            await db_mysql.commit()
            return { success:true, message: "El producto fue creado correctamente" }

        } catch (error) {
            await db_mysql.rollback()
            return  { success:false, message: error.message}
        }

    }

    static async edit( id, body ){
        try {
            let query = "UPDATE productos SET"
            let params_2 = []
            let campos = []
            for (const key in body) {
                campos.push(` ${key} = ? `)
                params_2.push( body[ key ] )
            }
            query += `${campos.join(', ')} WHERE id = ?`
            params_2.push(id)
            
            const [ productoEditado ] = await db_mysql.query( query, params_2 )
            if( productoEditado.affectedRows == 0 ){
                return {
                    success: false,
                    message: 'No se encontraron productos con ese identificador'
                }    
            }

            return {
                success: true,
                message: 'El producto se edito correctamente'
            }
        } catch (error) {
            return {
                success: false,
                message: 'Error al querer editar el producto'
            }
        }
    }
}