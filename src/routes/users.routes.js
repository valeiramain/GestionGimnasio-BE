import { Router } from "express";
import { crearUsuario } from "../controllers/users.controller.js";
import validacionUser from "../middlewares/validacionUser.js";

const router = Router();
//contruir la ruta: http://localhost:3000/api/usuarios
 
router.route("/").post([validacionUser],crearUsuario);

export default router;