const { Router } = require("express");
const { check } = require("express-validator");
const { validarJWT, validarCampos } = require("../middlewares");
const { crearCategoria } = require("../controllers/categorias");

const router = Router();

// Obtener todas las categorias - PUBLICO
router.get("/", (req, res) => {
  res.json("get");
});

// Obtener una categoria por ID - PUBLICO
router.get("/:id", (req, res) => {
  res.json("get-id");
});

// Crear una categoria - PRIVADO - cualquier persona con token valido
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").notEmpty(),
    validarCampos,
  ],
  crearCategoria
);

// Actualizar - PRIVADO - cualquier persona con token valido
router.put("/:id", (req, res) => {
  res.json("put");
});

// Borrar una categoria - PRIVADO - ADMIN
router.delete("/:id", (req, res) => {
  res.json("delete");
});

module.exports = router;
