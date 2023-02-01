const Transfer = require("../models/transfer.model");
const User = require("../models/user.model");

exports.registerTransfers = async (req, res) => {
    try {
        // OBTENER INFORMACION  DEL REQ BODY
        const { accountNumber, amount, senderUserId } = req.body;

        // CONSTANTE DEL USUARIO QUE RECIBE LA TRANSFERENCIA
        const userReceiver = await User.findOne({
            where: {
                accountNumber,
                status: true
            }
        });

        // CONSTANTE DEL USUARIO QUE REALIZA TRANSFERENCIA
        const userMakeTransfer = await User.findOne({
            where: {
                status: true,
                id: senderUserId
            }
        })

        // VALIDA SI EL MONTO TRANSFERIDO ES MENOR AL MONTO TOTAL
        if (userMakeTransfer.amount < amount) {
            return res.status(400).json({
                status: 'error',
                message: 'Falta dinero',
            });
        }

        // VALIDA SI EL USUARIO QUE ENVIA ES IGUAL AL USUARIO RECIBIDO
        if (senderUserId == userReceiver.id) {
            return res.status(400).json({
                status: 'error',
                message: 'Error de destino',
            });
        }

        // DEFINIMOS LA SUSTRACCION DEL MONTO TRANSFERIDO
        const newAmountReceiver = await userMakeTransfer.update({
            amount: userMakeTransfer.amount - amount
        })

        // DEFINIMOS LA ADICION DEL NUEVO MONTO RECIBIDO
        const newAmountSender = await userReceiver.update({
            amount: parseFloat(userReceiver.amount) + amount
        })

        // REGISTRAMOS LA TRANSFERENCIA
        const newTransfer = await Transfer.create({
            amount,
            senderUserId,
            receiverUserId: userReceiver.id,
        })

        // RESPUESTA DEL SERVIDOR
        res.status(201).json({
            status: 'success',
            message: 'The transfer was created.',

            newTransfer,

        });

    } catch (error) {
        // console.log(error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
}
