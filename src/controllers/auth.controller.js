const User = require("../models/auth.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
//const jwtSecret =
//"81c7c86d2f2bf0655a5574ffcd3fb40fa23d51817e94975bcdcb2bd04cf5127d3345e6";

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email | !password) {
      res.status(400).json({
        status: 0,
        message: "Faltan parámetros.",
      });
    } else {
      const user = await User.findOne({ email });
      if (!user) {
        res.status(404).json({
          status: 0,
          message: "Usuario no encontrado.",
          user: null,
        });
      } else {
        // Comparar las claves
        const compare = await bcrypt.compare(password, user.password);
        if (compare) {
          const user = await User.findOne({ email });
          const userEmail = user.email;
          const userUsername = user.username;
          const token = jwt.sign(
            { userEmail, userUsername },
            process.env.SECRET
          );
          // Temporalmente
          res.status(200).json({
            status: 1,
            message: "Acceso correcto",
            token,
          });
        } else {
          res.status(401).json({
            status: 1,
            message: "Clave y/o correo incorrectos.",
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 0,
      message: "Ocurrió un error desconocido..",
    });
  }
};
