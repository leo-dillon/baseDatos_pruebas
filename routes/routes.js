import productosRouter  from "./productos.js";
import commentsRouter   from "./comments.js";
import ratingsRouter    from "./ratings.js";
import usersRouter      from "./users.js";
import addressesRouter from "./addresses.js";

export default function routesAPI ( app ){
    app.use('/productos',   productosRouter )
    app.use('/users'    ,   usersRouter     )
    app.use('/ratings'  ,   ratingsRouter   )
    app.use('/comments' ,   commentsRouter  )
    app.use('/addresses',   addressesRouter )
}