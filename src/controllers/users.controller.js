import User from "../models/user.js";
import bcrypt from "bcrypt";
import generarJWT from "../helpers/generarJWT.js";

export const crearUsuario = async (req, res) => {
  try {
    //hashear la contraseña
    const saltos = bcrypt.genSaltSync(10);
    console.log(saltos);
    const passwordHasheado = bcrypt.hashSync(req.body.password, saltos);
    req.body.password = passwordHasheado;

    const usuarioNuevo = new User(req.body);
    usuarioNuevo.fechaAltaPlan = new Date();
    await usuarioNuevo.save();
    res.status(201).send("Usuario creado correctamente");
  } catch (error) {
    console.error(error);
    res.status(500).send("Ocurrió un error al intentar crear usuario");
  }
};
