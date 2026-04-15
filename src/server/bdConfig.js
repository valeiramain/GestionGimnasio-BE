import mongoose from 'mongoose'
try{
    mongoose.connect(process.env.MONGODB).then(()=>console.info('La conexión a la DB se realizó correctamente'))
}catch(error){
    console.error(error)
}

export default mongoose