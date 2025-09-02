import { ProductoModel } from "../model/mysql/producto.js"
import { parcialValidateProduct, validateProduct } from "../schemas/productos.js"
import { mostrar } from "../utils/mostrar.js"

export class ProductosController{
    static async getAll ( req, res ) {
        const { category } = req.query
        let info = await ProductoModel.getAll({ category })
        if( info && info.length > 0 ) return res.status(200).json(info)
        return res.status(404).send( "Articulo no encontrado" )
    }

    static async getByID ( req, res ) {
        const { id } = req.params
        let info = await ProductoModel.getByID({ id })
        if( info && info.length > 0 ) return res.json(info)
        return res.status(404).send( "Articulo no encontrado" )
    }

    static async create ( req, res ) {
        const resultValidate = validateProduct( req.body )


        if( resultValidate.error ){
            return res.status(400).json({ message: "Error en los datos cargados" })
        }
        let producto = await ProductoModel.create( resultValidate.data )
        if( producto.success ) res.status( 201 ).json( producto )
        res.status( 422 ).json( producto )
    }

    static  async edit ( req, res ) {
        const { id } = req.params
        const resultValidate = parcialValidateProduct( req.body )
        if( resultValidate.error ) return res.status(400).json({message: "Error al editar el producto seleccionado"})
    
        const product = await ProductoModel.edit( id, resultValidate.data )
    
        if( product.success ) return res.status(200).json({message: product.message})
        return res.status(404).json({ message: product.message }) 
    }
}