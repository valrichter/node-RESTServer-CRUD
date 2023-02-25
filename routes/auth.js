const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth");
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

module.exports = router;
