import { Router } from "express";
import { crearUsuario,listarUsurios } from "../controllers/users.controller.js";
import validacionUser from "../middlewares/validacionUser.js";
import verificarJWT from "../middlewares/verificarJWT.js"
const router = Router();
//contruir la ruta: http://localhost:3000/api/usuarios
 
router.route("/").post([verificarJWT,validacionUser],crearUsuario).get(listarUsurios);

export default router;