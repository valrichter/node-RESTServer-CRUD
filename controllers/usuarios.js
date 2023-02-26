const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");

const usuariosGet = async (req = request, res = response) => {
  const { limit = 5, desde = 0 } = req.query;
  const query = { state: true };

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limit)),
  ]);

  res.json({
    total,
    usuarios,
  });
};

const usuariosPost = async (req, res = response) => {
  const { name, email, password, role } = req.body;
  const usuario = new Usuario({ name, email, password, role });

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  // Guardar en DB
  await usuario.save();

  res.json(usuario);
};

const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...resto } = req.body;

  if (password) {
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json({
    msg: "Put API - controlador",
    usuario,
  });
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "Patch API - controlador",
  });
};

const usuariosDelete = async (req, res = response) => {
  const { id } = req.params;
  const usuarios = await Usuario.findByIdAndUpdate(id, { state: false });
  const usuariosAutenticado = req.usuario;

  res.json({
    usuarios,
    usuariosAutenticado,
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
