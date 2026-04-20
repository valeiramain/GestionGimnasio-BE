import jwt from "jsonwebtoken";

const verificarJWT = (req, res, next) => {
  try {
    // el token se carga en el header de la solicitud
    const authHeader = req.header("authorization");

    //Bearer + token cuando esta con el formato correcto
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "No hay token, permiso no válido" });
    }
    // console.log(authHeader);
    // Separamos la palabra "Bearer" del token real. divide el token en 2, y toma la segunda parte
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ mensaje: "No hay token en la petición" });
    }

    //jwt.verify verifica que el token sea valido
    const payload = jwt.verify(token, process.env.SECRETJWT);
    //puedo extrar la información del payload
    req.idUsuario = payload.id;
    // req.propNueva = payload.email;
    next();
  } catch (error) {
    // console.error(error);
    console.error("Error en JWT:", error.name);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        mensaje: "Tu sesión ha expirado, por favor vuelve a iniciar sesión.",
      });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        mensaje: "Token inválido o mal formado.",
      });
    }
    res.status(401).json({
      mensaje: "No se pudo autenticar el token.",
    });
  }
};

export default verificarJWT;
