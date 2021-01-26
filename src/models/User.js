import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = new Schema({
    first_name: {
        type: String,
        required: false,
        trim: true,
    },
    last_name: {
        type: String,
        required: false,
        trim: true,
    },
    username: {
        type: String,
        unique: true,
        required: [true, 'El nombre de usuario es necesario'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario'],
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerida'],
    },
    location: {
        type: String,
        default: '',
    },
    document: {
        type: Number,
    },
    document_type: {
        type: String,
    },
    gender: {
        type: String,
        default: 'no seleccionado',
    },
    img: {
        type: String,
        required: false,
    },
    status: {
        type: Boolean,
        default: true,
    },
    services_history: [{
        freelancer_id: { type: Schema.Types.ObjectId },
        service_id: { type: Schema.Types.ObjectId },
        date: { type: Date, default: new Date() },
    }],
    type: {
        type: String,
        default: 'user',
    },
}, {
    versionKey: false,
    timestamps: true,
});

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    return userObject;
};

userSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' });

export default model('User', userSchema);
