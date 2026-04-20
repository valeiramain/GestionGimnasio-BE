import User from "../models/user.js";
import bcrypt from "bcrypt";

// jwt se usa en LOGIN
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


export const listarUsurios = async (req, res) => {
  try {
    const listaUsuarios = await User.find();
    if (listaUsuarios.length === 0) {
      return res.status(404).json({ mensaje: "No hay usuarios registrados" });
    }
    res.status(200).json(listaUsuarios);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrió un error al intentar listar los usuarios" });
  }
};
