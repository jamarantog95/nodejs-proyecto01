
// RUTAS : puntos de entrada de la aplicacion

const { Router } = require("express");
const { registerUser, login } = require("../controllers/user.controller");
const router = Router();

router.post('/signup', registerUser);

router.post('/login', login);

module.exports = {
    userRouter: router,
}