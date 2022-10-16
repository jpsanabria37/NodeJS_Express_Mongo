const Curso = require("../models/Curso");

async function crearCurso(body) {
  let curso = new Curso({
    titulo: body.titulo,
    descripcion: body.descripcion,
    alumnos: body.alumnos,
    calificacion: body.calificacion,
  });

  return await curso.save();
}

async function activarCursoDeshabilitado(id) {
  let curso = await Curso.findByIdAndUpdate(
    id,
    {
      $set: {
        estado: true,
      },
    },
    { new: true }
  );

  return curso;
}

async function actualizarCurso(id, body) {
  return await Curso.findByIdAndUpdate(
    id,
    {
      $set: {
        titulo: body.titulo,
        descripcion: body.descripcion,
      },
    },
    { new: true }
  );
}
async function listarCursosActivos() {
  return await Curso.find({ estado: true });
}

async function desactivarCurso(id) {
  let curso = await Curso.findByIdAndUpdate(
    id,
    {
      $set: {
        estado: false,
      },
    },
    { new: true }
  );

  return curso;
}

module.exports = {
  desactivarCurso,
  listarCursosActivos,
  actualizarCurso,
  activarCursoDeshabilitado,
  crearCurso,
};
