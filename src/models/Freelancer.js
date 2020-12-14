import { Schema, model } from 'mongoose'

const freelancerSchema = new Schema({
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    document: {
        type: Number,
        required: [true, "El documento es requerido"]
    },
    services: {
        type: Array,
        default: []
    },
    gender: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: [true, 'La imagen es requerida'],
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: false
    },
}, {
    versionKey: false,
    timestamps: true
});

freelancerSchema.methods.toJSON = function () {
    let freelancer = this;
    let freelancerObject = freelancer.toObject();
    delete freelancerObject.password;
    return freelancerObject
}

export default model('Freelancer', freelancerSchema)