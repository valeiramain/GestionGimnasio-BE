import { Router } from "express";
import { crearUsuario } from "../controllers/users.controller.js";

const router = Router();
//contruir la ruta: http://localhost:3000/api/usuarios
 
router.route("/").post(crearUsuario);

export default router;