import { Schema, model } from 'mongoose'

const transactionStatus = {
    values: [
        'Pendiente',
        'Rechazada',
        'Aceptada',
    ],
    message: '{VALUES} no es una categoria valida'
}

const serviceSchema = new Schema({
    service_id: {
        type: Schema.Types.ObjectId,
        ref: 'Service',
        required: [true, 'El id del servicio es obligatorio']
    },
    freelancer_id: {
        type: Schema.Types.ObjectId,
        ref: 'Freelancer',
        required: [true, 'El id del freelancer es obligatorio']
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El id del usuario es obligatorio']
    },
    transaction_status: {
        type: String,
        required: [true, 'El estado de la transaccion es necesaria'],
        enum: transactionStatus,
    }
}, { versionKey: false, timestamps: true });

module.exports = { Service: model('Transaction', serviceSchema) }