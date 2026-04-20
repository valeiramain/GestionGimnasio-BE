import { validationResult } from "express-validator"

const resultadoValidacion = (req,res,next)=>{
    const errores = validationResult(req)
    if(!errores.isEmpty()){
        //respondemos con el mensaje de error
       return res.status(400).json(errores.array())
    }
    //continuar con la ejecucion del backend
    next()
}

export default resultadoValidacion;