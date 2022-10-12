const express = require("express");
const Curso = require("../models/Curso");
const router = express.Router();

router.get("/", (req, res) => {
  res.json("respuesta a peticioón Get de cursos funcionando correctamente");
});

module.exports = router;
