import jwt from "jsonwebtoken";

//en los parametros está la información que queremos guardar en el token: Id del usuario, nombre, email
//NO se debe guardar información sensible en el token
// const generarJWT = (datosParaJwt) => {
const generarJWT = (id) => {
  try {
    const payload = { id };
    //crea token
    const token = jwt.sign(payload, process.env.SECRETJWT, { expiresIn: "2h" });
    return token;
  } catch (error) {
    console.error(error);
    throw new Error("Error al generar el token");
  }
};

export default generarJWT;
