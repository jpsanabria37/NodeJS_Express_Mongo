const express = require("express");
const logic = require("../logic/logic_usuario");
const router = express.Router();

router.get("/", (req, res) => {
  let resultado = logic.listarUsuariosActivos();

  resultado
    .then((r) => {
      res.json({
        "status code": 200,
        usuarios: r,
      });
    })
    .catch((err) => {
      res.status(400).json({
        err,
      });
    });
});

router.post("/", (req, res) => {
  let body = req.body;

  const { error, value } = logic.schema.validate({
    nombre: body.nombre,
    email: body.email,
  });
  if (!error) {
    let result = logic.crearUsuario(body);

    result
      .then((user) => {
        res.json({
          "status code": 200,
          message: "Usuario creado correctamente",
          usuario: user,
        });
      })
      .catch((err) => {
        res.status(400).json({
          err,
        });
      });
  } else {
    res.status(400).json({
      error,
    });
  }
});

router.put("/:email", (req, res) => {
  const { error, value } = logic.schema.validate({ nombre: req.body.nombre });

  if (!error) {
    let resultado = logic.actualizarUsuario(req.params.email, req.body);

    resultado
      .then((r) => {
        res.json({
          "status code": 200,
          message: "Usuario actualizado correctamente",
          Usuario: r,
        });
      })
      .catch((err) => {
        res.status(400).json({
          err,
        });
      });
  } else {
    res.status(400).json({
      error,
    });
  }
});

router.delete("/:email", (req, res) => {
  let resultado = logic.desactivarUsuario(req.params.email);
  resultado
    .then((r) => {
      res.json({
        "status code": 200,
        message: "Usuario deshabilitado correctamente",
        Usuario: r,
      });
    })
    .catch((err) => {
      res.status(400).json({
        error,
      });
    });
});

router.put("/habilitar-usuario/:email", (req, res) => {
  let resultado = logic.activarUsuarioDeshabilitado(req.params.email);
  resultado
    .then((r) => {
      res.json({
        "status code": 200,
        message: "Usuario habilitado correctamente",
        Usuario: r,
      });
    })
    .catch((err) => {
      res.status(400).json({
        error,
      });
    });
});

module.exports = router;
