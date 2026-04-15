// diseñar las rutas con express
import { Router } from "express";

//invocar las herramientas que nos provee router, y las guarda en el objeto router
const router = Router()

// ruta de prueba: http://localhost:3000/api/test
// probar en el navegador si funciona
// router.get("/test",(req,res) =>{
//     res.send("Ruta de prueba funcionando 🚀")
// })

//directorio de todas las rutas
//contruir la ruta: http://localhost:3000/api/servicios
// router.use('/servicios',serviciosRoutes)
//contruir la ruta: http://localhost:3000/api/usuarios
// router.use('/usuarios',usuariosRoutes)
//contruir la ruta: http://localhost:3000/api/pagos
// router.use('/pagos',pagosRoutes)

export default router;