import { body } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";
import Usuario from "../models/user.js";

const validacionUser = [
  body("nombre")
    .notEmpty()
    .withMessage("El nombre de usuario es un dato obligatorio")
    .isLength({
      min: 3,
      max: 20,
    })
    .withMessage("El nombre de usuario debe tener entre 3 y 20 caracteres")
    .isString()
    .withMessage("El nombre de usuario debe ser un texto"),

  body("apellido")
    .notEmpty()
    .withMessage("El apellido de usuario es un dato obligatorio")
    .isLength({
      min: 3,
      max: 30,
    })
    .withMessage("El apellido de usuario debe tener entre 3 y 30 caracteres")
    .isString()
    .withMessage("El apellido de usuario debe ser un texto"),

  body("email")
    .notEmpty()
    .withMessage("El email es un dato obligatorio")
    .isEmail()
    .withMessage(
      "El email debe tener un formato válido. Ej: email@dominio.extensión",
    )
    .matches(
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
    )
    .withMessage(
      "El email debe cumplir con el siguiente formato: email@dominio.extension",
    )
    .custom(async (valor, { req }) => {
      // verificar que el email no este duplicado
      const usuarioExistente = await Usuario.findOne({ email: valor });
      // Si el usuario existe Y no es el mismo que estamos editando
      if (
        usuarioExistente &&
        usuarioExistente._id.toString() !== req.params.id
      ) {
        throw new Error("El email ya está en uso por otro usuario");
      }
    }),

  body("password")
    .notEmpty()
    .withMessage("La contraseña es un dato obligatorio")
    .isLength({
      minLength: 8,
      maxLength: 16,
    })
    .withMessage(
      "La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter especial.",
    )

    .withMessage(
      "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo",
    )
    .matches(
      /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/,
    ),
  body("telefono")
    .notEmpty()
    .withMessage("El telefono del usuario es un dato obligatorio")
    .isLength({
      min: 8,
      max: 30,
    })
    .withMessage("El telefono del usuario debe tener entre 8 y 30 caracteres")
    .isString()
    .withMessage("El telefono de usuario debe ser tipo texto"),
  body("plan")
    .notEmpty()
    .withMessage("El Plan contratado es un dato obligatorio")
    .isString()
    .withMessage("El Plan contratado debe ser una cadena de texto")
    .isIn(["ninguno", "musculacion", "clases", "full"])
    .withMessage(
      "El Plan contratado debe ser uno de los siguientes valores: ninguno, musculacion, clases, full",
    ),
  body("role")
    .notEmpty()
    .withMessage("El rol del usuario es un dato obligatorio")
    .isString()
    .withMessage("El rol del usuario debe ser una cadena de texto")
    .isIn(["admin", "user"])
    .withMessage(
      "El rol del usuario debe ser uno de los siguientes valores: admin o user",
    ),

  (req, res, next) => resultadoValidacion(req, res, next),
];

export default validacionUser;
