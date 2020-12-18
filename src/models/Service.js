import { Schema, model } from 'mongoose'

//TODO: define list of categories
const categories = {
    values: [
        'Belleza',
        'Salud',
        'Ocio',
        'Mantenimiento',
        'Tecnologia',
        'Mascotas',
        'Musica',
        'Educacion',
        'Alimentacion'
    ],
    message: '{VALUES} no es una categoria valida'
}

const serviceSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: [true, 'La catogoria es necesaria'],
        enum: categories,
    },
    freelancer_id: {
        type: Schema.Types.ObjectId,
        required: [true, 'El freelancer es obligatorio']
    },
    is_presencial: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        trim: true
    },
    reviews: [{
        stars: { type: Number },
        review: { type: String },
        user_id: { type: Schema.Types.ObjectId }
    }],
    num_purchases: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },

}, {
    versionKey: false,
    timestamps: true
});
module.exports = {
    Service: model('Service', serviceSchema),
    categories
}
