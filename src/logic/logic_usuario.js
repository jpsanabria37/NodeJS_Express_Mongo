const Usuario = require("../models/Usuario");
const Joi = require("@hapi/joi");

const schema = Joi.object({
  nombre: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "edu", "co"] },
  }),
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

module.exports = {
  actualizarUsuario,
  listarUsuariosActivos,
  activarUsuarioDeshabilitado,
  crearUsuario,
  desactivarUsuario,
  schema,
};
