const { response } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // Verificar si el EMAIL existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario / Password incorrect - correo",
      });
    }

    // Si el usuario esta activo
    if (!usuario.state) {
      return res.status(400).json({
        msg: "Usuario / Password incorrect - estado: false",
      });
    }

    // Verificar la password
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario / Password incorrect - password",
      });
    }

    // Generar el JWT

    res.json({
      msj: "Login OK",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con administracion",
    });
  }
};

module.exports = {
  login,
};
