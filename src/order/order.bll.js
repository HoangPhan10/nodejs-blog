import { ModelOrder } from './order'
import { ModelProduct } from '../product/product'
import { ModelCustomer } from '../customer/customer'


export const getListOrder = async(req, res) => {
    const orders = await ModelOrder.find()
    res.status(200).json(orders)
}

export const getOrder = async(req, res) => {
    if (req.query.id) {
        const order = await ModelOrder.findOne({ _id: req.query.id })
        res.status(200).json(order)
    } else if (req.query.customer_id && req.query.status) {
        const order = await ModelOrder.find({ status: req.query.status, customer_id: req.query.customer_id })
        res.status(200).json(order)
    } else if (req.query.customer_id) {
        const order = await ModelOrder.find({ customer_id: req.query.customer_id })
        res.status(200).json(order)
    } else if (req.query.status) {
        const order = await ModelOrder.find({ status: req.query.status })
        res.status(200).json(order)
    } else {
        res.status(400).json("not found query params")
    }
}

export const createOrder = async(req, res) => {
    try {
        const body = req.body
        const newOrder = new ModelOrder(body)
        const checkProductId = await ModelProduct.findOne({ _id: newOrder.product_id })
        const checkCustomerId = await ModelCustomer.findOne({ _id: newOrder.customer_id })
        if (checkProductId && checkCustomerId) {
            await newOrder.save()
            res.status(200).json(newOrder)
        } else {
            res.status(400).json("Not found")
        }
    } catch (e) {
        res.status(400).json(e.message)
    }
}

export const updateOrder = async(req, res) => {
    try {
        const order = await ModelOrder.findOne({ _id: req.query.id })
        const nowStatus = order.status
        if (nowStatus === "await") {
            if (req.body.status === "new") {
                res.status(400).json("status must not map(await=>new)")
            } else {
                const newOrder = await ModelOrder.findOneAndUpdate({ _id: order._id }, {...req.body, mtime: Date.now() }, { new: true })
                res.status(200).json(newOrder)
            }
        } else if (nowStatus === "cancel" || nowStatus === "done" || nowStatus === "delete") {
            res.status(400).json("must not be update")
        } else {
            const newOrder = await ModelOrder.findOneAndUpdate({ _id: order._id }, {...req.body, mtime: Date.now() }, { new: true })
            res.status(200).json(newOrder)
        }
    } catch (e) {
        res.status(400).json(e.message)
    }
}