import express from "express"
import { config } from "dotenv"
import productosRouter from "./routes/productos.js"

config()

const PORT = process.env.PORT ?? 5000
const app = express()

app.disable('x-powered-by')
app.use( express.json() )

app.use('/productos', productosRouter)

app.use( (req, res) => {
    res.status(404).send( "<h1> OOOOO nooo error 404</h1>" )
})

app.listen( PORT, () => {
    console.log(`El servidor se esta corriendo de forma correcta en el puerto http://localhost:${PORT}`)
} )