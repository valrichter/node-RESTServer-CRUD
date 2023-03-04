const { Categoria, Usuario, Producto } = require("../models");
const Role = require("../models/role");

const esRoleValido = async (role = "") => {
  const exsiteRole = await Role.findOne({ role });
  if (!exsiteRole) {
    throw new Error(`El ROL: ${role} no esta registrado en la BD`);
  }
};

const emailExiste = async (email = "") => {
  const existeEmail = await Usuario.findOne({ email });
  if (existeEmail) {
    throw new Error(`El EMAIL ${email} ya esta registrado en la BD`);
  }
};

const existeUsuarioPorId = async (id) => {
  const existeUsuario = await Usuario.findById(id);

  if (!existeUsuario) {
    throw new Error(`El ID no existe: ${id}`);
  }
};

const existeCategoriaPorId = async (id) => {
  const existeCategoria = await Categoria.findById(id);

  if (!existeCategoria) {
    throw new Error(`El ID no existe: ${id}`);
  }
};

const existeProductoPorId = async (id) => {
  const existeProducto = await Producto.findById(id);

  if (!existeProducto) {
    throw new Error(`El ID no existe: ${id}`);
  }
};

module.exports = {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
  existeCategoriaPorId,
  existeProductoPorId,
};
