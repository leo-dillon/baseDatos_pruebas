import { Router } from "express";
import { carritoController } from "../controllers/carritos.js";

const carritosRuter = Router()

carritosRuter.post('/', carritoController.create )

carritosRuter.get('/', carritoController.getAll )

carritosRuter.get('/user/:id', carritoController.getByUserId )

export default carritosRuter