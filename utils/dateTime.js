/**
    * Formatea la función date para tomar la fecha en el formato timpo SQL que nos pide
    *
    * @returns { String } 
    *   Retorna la fecha de hoy con el siguiente Formato aaaa-mm-dd hh-mm-ss
    *
*/
export default function dateTime(){
    let date    = new Date()
    let year    = date.getFullYear()
    let month   = String( date.getMonth() + 1   ).padStart(2, '0')
    let day     = String( date.getDate()        ).padStart(2, '0')
    let hour    = String( date.getHours()       ).padStart(2, '0')
    let min     = String( date.getMinutes()     ).padStart(2, '0')
    let sec     = String( date.getSeconds()     ).padStart(2, '0')

    let dateTime = `${year}-${month}-${day} ${hour}:${min}:${sec}`
    return dateTime 
}