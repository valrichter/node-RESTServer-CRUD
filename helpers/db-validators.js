const Role = require("../models/role");
const Usuario = require("../models/usuario");

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

module.exports = {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
};
