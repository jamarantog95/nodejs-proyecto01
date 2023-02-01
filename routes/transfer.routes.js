
// RUTAS : puntos de entrada de la aplicacion

const { Router } = require("express");
const { registerTransfers } = require("../controllers/transfer.controller");

const router = Router();

router.post('/', registerTransfers);


module.exports = {
    transferRouter: router,
}