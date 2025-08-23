import { Router } from "express";
import { parcialValidateProduct, validateProduct } from "../schemas/productos.js";
import { ProductoModel } from "../model/producto.js";
import { ca } from "zod/v4/locales";

const productosRouter = Router()

productosRouter.get('/', async ( req, res ) => {
    const { category } = req.query
    let info = await ProductoModel.getAll({ category })
    if( info ) return res.json(info)
    return res.status(404).send( "Articulo no encontrado" )
})

productosRouter.get('/:id', async ( req, res ) => {
    const { id } = req.params
    let info = await ProductoModel.getByID({ id })
    if( info ) return res.json(info)
    return res.status(404).send( "Articulo no encontrado" )
})

productosRouter.post('/', async ( req, res ) => {
    const resultValidate = validateProduct( req.body )

    if( resultValidate.error ){
        return res.status(400).json({ message: "Error en los datos cargados" })
    }
    // console.log(resultValidate.data)
    let producto = await ProductoModel.create( resultValidate.data )
    res.status( 201 ).json( producto )
})

productosRouter.patch( '/:id', async ( req, res ) => {
    const { id } = req.params
    const resultValidate = parcialValidateProduct( req.body )

    if( resultValidate.error ) return res.status(400).json({message: "Error al editar el producto seleccionado"})

    const product = await ProductoModel.edit( id, resultValidate.data )

    if( product.message ) res.status(404).json( product.message )
    res.status(200).json({message: "Pelicula actualizada correctamente"})
})

export default productosRouter