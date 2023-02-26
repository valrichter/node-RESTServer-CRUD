const { Router } = require("express");
const { check } = require("express-validator");
const {
  validarCampos,
  validarJWT,
  esAdminRole,
  tieneRole,
} = require("../middlewares");
const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
} = require("../controllers/usuarios");
const {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
} = require("../helpers/db-validators");

const router = Router();

router.get("/", usuariosGet);

router.post(
  "/",
  [
    check("name", "NAME invalido").not().isEmpty(),
    check("email", "EMAIL invalido").isEmail(),
    check("email").custom(emailExiste),
    check("password", "PASSWORD debe ser de mas de 6 letras").isLength({
      min: 6,
    }),
    check("role").custom(esRoleValido),
    validarCampos,
  ],
  usuariosPost
);

router.put(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("role").custom(esRoleValido),
    validarCampos,
  ],
  usuariosPut
);

router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    tieneRole("ADMIN_ROLE", "VENTAS_ROLE"),
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  usuariosDelete
);

router.patch("/", usuariosPatch);

module.exports = router;
