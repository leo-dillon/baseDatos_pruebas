import { Router } from "express";
import { userController } from "../controllers/users.js";

const usersRouter = Router()

usersRouter.get( "/", userController.getAll )

usersRouter.post('/', userController.create )

usersRouter.put( "/", userController.edit )

// usersRouter.patch( "" )

export default usersRouter