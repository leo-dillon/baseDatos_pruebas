import productosRouter  from "./productos.js";
import commentsRouter   from "./comments.js";
import ratingsRouter    from "./ratings.js";
import usersRouter      from "./users.js";
import addressesRouter from "./addresses.js";
import carritosRuter from "./carritos.js";

export default function routesAPI ( app ){
    app.use('/productos',   productosRouter )
    app.use('/addresses',   addressesRouter )
    app.use('/comments' ,   commentsRouter  )
    app.use('/ratings'  ,   ratingsRouter   )
    app.use('/carritos' ,   carritosRuter   )
    app.use('/users'    ,   usersRouter     )
}