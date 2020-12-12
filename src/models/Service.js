import { Schema, model } from 'mongoose'

const serviceSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    done: {
        type: Boolean,
        default: false
    },
}, {
    versionKey: false,
    timestamps: true
});

export default model('Task', serviceSchema)