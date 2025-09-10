import { Router } from "express";
import { addressesController } from "../controllers/addresses.js";

const addressesRouter = Router()

addressesRouter.post('/', addressesController.create )

addressesRouter.get('/', addressesController.getAll )

addressesRouter.patch('/:id', addressesController.edit )
addressesRouter.patch('/delete/:id', addressesController.delete )

export default addressesRouter  