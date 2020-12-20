import { Schema, model } from 'mongoose'

const userSchema = new Schema({
    first_name: {
        type: String,
        required: false,
        trim: true
    },
    last_name: {
        type: String,
        required: false,
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
        type: Number
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
    },
    services_history: [{
        freelancer_id: { type: Schema.Types.ObjectId },
        service_id: { type: Schema.Types.ObjectId },
        date: { type: Date, default: new Date() }
    }],
    type: {
        type: String,
        default: 'user'
    }
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


export default model('User', userSchema)