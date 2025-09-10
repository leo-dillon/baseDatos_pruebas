import { Router } from "express";
import { carritoItemsController } from "../controllers/carrito_items.js";

const carritoItemsRouter = Router()

carritoItemsRouter.post('/', carritoItemsController.create )

export default carritoItemsRouter