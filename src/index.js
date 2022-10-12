const usuarios = require("./controllers/usuarios");
const cursos = require("./controllers/cursos");

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();
//SETTINGS
app.set("port", process.env.PORT || 3000);

//CONEXION A LA BASE DE DATOS
mongoose
  .connect("mongodb://localhost:27017/userscoursesdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conexión correcta con mongo db"))
  .catch((err) => console.log("no se pudo conectar con mongo db...", err));

//MIDDLEWARE
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ENDPOINTS
app.use("/api/usuarios", usuarios);
app.use("/api/cursos", cursos);

app.listen(app.get("port"), () => {
  console.log(`Server running on port http://localhost:${app.get("port")}`);
});
