const User = require("../models/user.model");

exports.registerUser = async (req, res) => {
    try {
        // OBTENER INFORMACION  DEL REQ BODY
        const { name, password } = req.body;

        // CREAR UN NUEVO USUARIO
        const newUser = await User.create({
            name: name.toLowerCase(),
            accountNumber: Math.floor(100000 + Math.random() * 900000),
            password
        });

        // RESPUESTA DEL SERVIDOR
        res.status(201).json({
            status: 'success',
            message: 'The user was created.',

            newUser,

        });

    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
}

exports.login = async (req, res) => {
    try {
        // OBTENER INFORMACION  DEL REQ BODY
        const { accountNumber, password } = req.body;
        // BUSCAR EL USER DE FORMA INDIVIDUAL
        const user = await User.findOne({
            where: {
                // id:id,
                accountNumber,
                password,
                status: true
            }
        });

        // SI NO EXISTE ENVIAMOS UN ERROR
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'The user was not found',
            });
        }

        // RESPUESTA DEL SERVIDOR
        res.json({
            status: 'success',
            message: 'The user was login successfully.',
            //Enviamos el repair a consultar
            user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
}