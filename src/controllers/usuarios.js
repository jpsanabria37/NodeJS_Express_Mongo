const express = require("express");
const Usuario = require("../models/Usuario");
const Joi = require("@hapi/joi");
const router = express.Router();

const schema = Joi.object({
  nombre: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "edu", "co"] },
  }),
});

router.get("/", (req, res) => {
  let resultado = listarUsuariosActivos();

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

  const { error, value } = schema.validate({
    nombre: body.nombre,
    email: body.email,
  });
  if (!error) {
    let result = crearUsuario(body);

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
  const { error, value } = schema.validate({ nombre: req.body.nombre });

  if (!error) {
    let resultado = actualizarUsuario(req.params.email, req.body);

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
  let resultado = desactivarUsuario(req.params.email);
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
  let resultado = activarUsuarioDeshabilitado(req.params.email);
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

async function actualizarUsuario(email, body) {
  let usuario = await Usuario.findOneAndUpdate(
    { email: email },
    {
      $set: {
        nombre: body.nombre,
        password: body.password,
      },
    },
    { new: true }
  );
  return usuario;
}

async function listarUsuariosActivos() {
  return await Usuario.find({ estado: true });
}

async function desactivarUsuario(email) {
  let usuario = await Usuario.findOneAndUpdate(
    { email: email },
    {
      $set: {
        estado: false,
      },
    },
    { new: true }
  );

  return usuario;
}

async function crearUsuario(body) {
  var usuario = new Usuario({
    email: body.email,
    nombre: body.nombre,
    password: body.password,
  });

  return await usuario.save();
}

async function activarUsuarioDeshabilitado(email) {
  let usuario = await Usuario.findOneAndUpdate(
    { email: email },
    {
      $set: {
        estado: true,
      },
    },
    { new: true }
  );

  return usuario;
}

module.exports = router;
