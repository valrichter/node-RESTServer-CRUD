const { response } = require("express");

const esAdminRole = (req, res = response, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      msg: "Se quiere verificar el ROLE sin validar el token primero",
    });
  }

  const { role, name } = req.usuario;
  if (role !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${name} no es administrador - Nop puede hacer esto`,
    });
  }
};

module.exports = {
  esAdminRole,
};
