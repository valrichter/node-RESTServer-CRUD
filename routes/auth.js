const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSingin } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.post(
  "/login",
  [
    check("email", "EMAIL obligatorio").isEmail(),
    check("password", "PASSWORD obligatoria").not().isEmpty(),
    validarCampos,
  ],
  login
);

router.post("/google", [
  check("id_token", "El id_token es necesario").not().isEmpty(),
  googleSingin,
]);

module.exports = router;
