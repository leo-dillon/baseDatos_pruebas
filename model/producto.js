import tienda from "../json/productos.json" with { type: 'json'};

export class ProductoModel{
    static async getAll({ category }){
        if( category ){ 
            return tienda.filter( prod => prod.category == category ) 
        } else {
            return tienda
        }
    }

    static async getByID({ id }){
        return tienda.find( art => art.id == id )
    }

    static async create({ body }){
        console.log( body )
        const { id,title,price,description,category,image,rating} = body
        const newProduct = {
            "id": id,
            "title": title,
            "price": price,
            "description": description,
            "category": category,
            "image": "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_t.png",
            "rating": {
                "rate": rating.rate,
                "count": rating.count
            }
        }
        tienda.push(newProduct)
        return newProduct
    }

    static async edit({ id, body }){
        const productIndex = tienda.findIndex( prod => prod.id == id )
        if( productIndex == -1 ) return {message: "El producto que quieres editar no existe"}
        const upadteProduct = {
            ...tienda[productIndex],
            ...body
        }
    
        tienda[productIndex] = upadteProduct
    }
}