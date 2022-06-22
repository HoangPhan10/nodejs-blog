import mongoose from 'mongoose'

const SchemaProduct = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    material: {
        type: String,
        required: true,
    },
    image: {
        type: Array,
        required: true
    },
    color: {
        type: String,
        required: true,
    },
    consume: {
        type: Number,
        required: false,
        default: 0
    },
    amount: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    sale_price: {
        type: Number,
        required: false
    },
    gender: {
        type: String,
        required: true,
        enum: {
            values: ["men", "women", "children"],
            message: `{VALUE} is not supported`
        }
    },
    ctime: {
        type: String,
        default: Date.now(),
        required: true
    },
    mtime: {
        type: String,
        default: Date.now(),
        required: true
    },
    dtime: {
        type: String,
        required: false
    },
}, { versionKey: false })
export const ModelProduct = mongoose.model("products", SchemaProduct)