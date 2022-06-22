import mongoose from 'mongoose'
import rand from '../helper/rand'
import { Validate } from '../common/validate'
const SchemaOrder = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        default: rand.number(8)
    },
    status: {
        type: String,
        required: true,
        default: "new",
        enum: {
            values: ["new", "delete", "await", "done", "cancel"],
            message: `{VALUE} is not supported`
        }
    },
    customer_id: {
        type: String,
        required: true
    },
    product_id: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return Validate.CheckPhone(v);
            },
            message: props => `${props.value} is not a valid birthday number dd-mm-yyyy`
        },
    },
    ctime: {
        type: String,
        required: true,
        default: Date.now()
    },
    mtime: {
        type: String,
        required: true,
        default: Date.now()
    }
}, { versionKey: false })

export const ModelOrder = mongoose.model("orders", SchemaOrder)