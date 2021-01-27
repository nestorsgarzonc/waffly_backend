import { Schema, model } from 'mongoose';

const transactionStatus = {
    values: [
        'Pendiente',
        'Rechazada',
        'Aceptada',
    ],
    message: '{VALUES} no es una categoria valida',
};

const serviceSchema = new Schema({
    service_id: {
        type: Schema.Types.ObjectId,
        ref: 'Service',
        required: [true, 'El id del servicio es obligatorio'],
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El id del usuario es obligatorio'],
    },
    freelancer_id: {
        type: Schema.Types.ObjectId,
        ref: 'Freelancer',
        required: [true, 'El id del freelancer es obligatorio'],
    },
    transaction_status: {
        type: String,
        default: 'Pendiente',
        enum: transactionStatus,
    },
}, { versionKey: false, timestamps: true });

export default model('Transaction', serviceSchema);
