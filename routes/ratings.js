import { Router } from "express";
import { ratingsController } from "../controllers/ratings.js";


const ratingsRouter = Router()

ratingsRouter.get('/',  ratingsController.getAll )

ratingsRouter.post('/', ratingsController.create )

ratingsRouter.patch('/:id', ratingsController.edit )

ratingsRouter.post('/delete', ratingsController.delete )


export default ratingsRouter