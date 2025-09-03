import { Router } from "express";
import { userController } from "../controllers/users.js";

const usersRouter = Router()

usersRouter.get( "/", userController.getAll )

usersRouter.post('/', userController.create )

usersRouter.patch( "/", userController.edit )

usersRouter.patch( "/delete", userController.delete )

usersRouter.post("/clearAll", userController.clear )


export default usersRouter