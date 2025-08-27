import { Router } from "express";
import { ProductosController } from "../controllers/productos.js";

const productosRouter = Router()

productosRouter.get('/', ProductosController.getAll )

productosRouter.get('/:id', ProductosController.getByID )

productosRouter.post('/', ProductosController.create )

productosRouter.patch( '/:id', ProductosController.edit )

export default productosRouter