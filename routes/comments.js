import { Router } from "express"
import { commentsController } from "../controllers/comments.js"

const commentsRouter = Router()

commentsRouter.post('/', commentsController.create )

commentsRouter.get('/', commentsController.getAll )

commentsRouter.patch('/:id', commentsController.edit )

commentsRouter.patch('/:id/delete', commentsController.delete )

export default commentsRouter