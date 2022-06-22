import express from 'express'
import { getListOrder, getOrder, createOrder, updateOrder } from './order.bll'

const OrderApi = express.Router()

OrderApi.get("/order/list", getListOrder)
OrderApi.get("/order/get", getOrder)
OrderApi.post("/order/create", createOrder)
OrderApi.post("/order/update", updateOrder)

export default OrderApi