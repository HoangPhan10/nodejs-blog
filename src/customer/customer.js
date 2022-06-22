import mongoose from "mongoose";
import { Validate } from '../common/validate'
const schemaCustomer = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [3, `name must be at least 3 characters`],
        maxLength: [20, 'name at most 20 characters']
    },
    role: {
        type: String,
        required: true,
        enum: {
            values: ["admin", "customer"],
            message: '{VALUE} is not supported'
        },
    },
    username: {
        type: String,
        required: true,
        minLength: [3, `username must be at least 3 characters`],
        maxLength: [20, 'username at most 20 characters']
    },
    birthday: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return Validate.CheckDate(v);
            },
            message: props => `${props.value} is not a valid birthday number dd-mm-yyyy`
        },
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return Validate.CheckPhone(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
    },
    cccd: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return Validate.CheckCccd(v);
            },
            message: props => `${props.value} is not a valid cccd 9 or 12 number!`
        },
    },
    ctime: {
        type: String,
        required: true,
    },
    mtime: {
        type: String,
        required: true,
    },
    dtime: {
        type: String,
        required: false,
    },
}, { versionKey: false });

export const ModelCustomer = mongoose.model("customers", schemaCustomer);