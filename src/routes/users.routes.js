import { Router } from "express";
import { crearUsuario,listarUsurios,login } from "../controllers/users.controller.js";
import validacionUser from "../middlewares/validacionUser.js";
import verificarJWT from "../middlewares/verificarJWT.js"
const router = Router();
//contruir la ruta: http://localhost:3000/api/usuarios

// CREAR Y LISTAR
router.route("/").post([verificarJWT,validacionUser],crearUsuario).get(listarUsurios);

// LOGIN
router.route("/login").post(login);
export default router;