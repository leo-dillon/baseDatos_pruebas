import productosRouter  from "./productos.js";
import usersRouter      from "./users.js";

export default function routesAPI ( app ){
    app.use('/productos', productosRouter)
    app.use('/users'    , usersRouter)
}