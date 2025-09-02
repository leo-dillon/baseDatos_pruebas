    import { mostrar } from "./mostrar.js"

    /**
    * Formatea un error de Zod a un array de objetos con nombre del campo y mensajes.
    *
    * @param {object} error - Error formateado por `zodError.format()`.
    * @returns {Array<{ name: string, message: string[] }>} 
    *   Retorna un array de errores con el nombre del campo y un array de mensajes.
    *
    */
    export default function ZodErrorFormat( error ){
        let messageError = []
        for (const message in error) {
            if ( message != '_errors' ){
                messageError.push({
                    name: message,
                    message: error[message]._errors.map( mesg => mesg )
                })
            } 
        }
        return messageError 
    }