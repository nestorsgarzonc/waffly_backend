import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const freelancerSchema = new Schema({
    first_name: {
        type: String,
        required: true,
        trim: true,
    },
    last_name: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    location: {
        type: String,
        required: true,
        trim: true,
    },
    document: {
        type: Number,
        unique: true,
        required: [true, 'El documento es requerido'],
    },
    services: [{
        type: Schema.Types.ObjectId,
        ref: 'Service',
    }],
    gender: {
        type: String,
        default: '',
    },
    email: {
        type: String,
        unique: true,
        required: true,
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
        default: true,
    },
    type: {
        type: String,
        default: 'freelancer',
    },
}, {
    versionKey: false,
    timestamps: true,
});

freelancerSchema.methods.toJSON = function () {
    const freelancer = this;
    const freelancerObject = freelancer.toObject();
    delete freelancerObject.password;
    return freelancerObject;
};

freelancerSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' });

export default model('Freelancer', freelancerSchema);
