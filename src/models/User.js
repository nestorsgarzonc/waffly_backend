import { Schema, model } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const userSchema = new Schema({
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
        unique: true,
        required: [true, 'El nombre de usuario es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerida']
    },
    location: {
        type: String,
        default: '',
    },
    document: {
        type: Number,
        unique: true,
        required: [true, 'El documento es obligatorio'],
    },
    gender: {
        type: String,
        default: 'no seleccionado',
    },
    img: {
        type: String,
        required: false
    },
    status: {
        type: Boolean,
        default: true
    }//TODO: add consumed services
}, {
    versionKey: false,
    timestamps: true
});

userSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject
}

userSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' })

export default model('User', userSchema)