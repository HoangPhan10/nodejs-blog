import express from 'express'
import morgan from 'morgan'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
// ==================================================================================
dotenv.config()
const PORT = process.env.PORT || 4000
const app = express()

// ==================================================================================
app.use(morgan("combined"))
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }))
app.use(cors())
    // ==================================================================================
import CustomerApi from './customer/customerApi'
import ProductApi from './product/productApi'
import OrderApi from './order/orderApi'
// ==================================================================================
app.use("/customer", CustomerApi)
app.use("/product", ProductApi)
app.use("/order", OrderApi)
    // ==================================================================================
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`listening on port ${PORT}`)
        });
    })
    .catch((err) => {
        console.log("err :", err)
    })