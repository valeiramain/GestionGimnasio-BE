import User from "../models/user.js";
import bcrypt from "bcrypt"; // para encriptar password al crear usuario
import generarJWT from "../helpers/generarJWT.js"; // jwt se usa en LOGIN
 
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


// ==============
// LOGIN USUARIO
// ==============
export const login = async (req, res) => {
  try {
    // toma email y password del body req.body.email, req.body.password (esta desestructurado)
    const { email, password } = req.body;
    //verificar si el email existe en la base de datos
    const usuarioBuscado = await User.findOne({ email }); // await Usuario.findOne({ email: req.body.email });

    if (!usuarioBuscado) {
      // 401 es acceso no autorizado
      res.status(401).json({ mensaje: "Credenciales Incorrectas. email" });
    }

    // verificar la contraseña que envía el usuario con la que está en la base de datos (true o false)
    const passwordValido = bcrypt.compareSync(
      password,
      usuarioBuscado.password,
    );

    if (!passwordValido) {
      // el codigo de error 401 es de acceso no autorizado
      return res
        .status(401)
        .json({ mensaje: "Credenciales Incorrectas. password" });
    }

    // Si todo correcto, informar al front que debe loguear al usuario.
    //  Se envia id del usuario par generar el token, lo que se guardara en el payload

    const token = generarJWT(usuarioBuscado._id);
    res.status(200).json({
      mensaje: "Login exitoso",
      nombre: usuarioBuscado.nombre,
      apellido: usuarioBuscado.apellido,
      role: usuarioBuscado.role,
      plan: usuarioBuscado.plan,
      token: token,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrió un error al intentar iniciar sesión" });
  }
};

