import { Schema, model } from 'mongoose'

//TODO: define list of categories
const categories = {
    values: [],
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

export default model('Service', serviceSchema)