const express = require("express");
const logic = require("../logic/logic_curso");
const router = express.Router();

router.get("/", (req, res) => {
  let resultado = logic.listarCursosActivos();

  resultado
    .then((r) => {
      res.json({
        "status code": 200,
        cursos: r,
      });
    })
    .catch((err) => {
      res.status(400).json({
        err,
      });
    });
});

router.post("/", (req, res) => {
  let resultado = logic.crearCurso(req.body);

  resultado
    .then((curso) => {
      res.json({
        "status code": 200,
        message: "curso creado correctamente",
        curso,
      });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
});

router.put("/:id", (req, res) => {
  let resultado = logic.actualizarCurso(req.params.id, req.body);
  resultado
    .then((curso) => {
      res.json({
        "status code": 200,
        message: "curso actualizado correctamente",
        curso,
      });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
});

router.delete("/:id", (req, res) => {
  let resultado = logic.desactivarCurso(req.params.id);
  resultado
    .then((r) => {
      res.json({
        "status code": 200,
        message: "curso deshabilitado correctamente",
        curso: r,
      });
    })
    .catch((err) => {
      res.status(400).json({
        error,
      });
    });
});

router.put("/habilitar-curso/:id", (req, res) => {
  let resultado = logic.activarCursoDeshabilitado(req.params.id);
  resultado
    .then((r) => {
      res.json({
        "status code": 200,
        message: "curso habilitado correctamente",
        curso: r,
      });
    })
    .catch((err) => {
      res.status(400).json({
        error,
      });
    });
});

module.exports = router;
