import { ModelCustomer } from './customer'

export const getCustomer = async(req, res) => {
    const customer = await ModelCustomer.findOne({ _id: req.query.id })
    res.status(200).json(customer)
}
export const getListCustomer = async(req, res) => {
    const customers = await ModelCustomer.find()
    res.status(200).json(customers.filter(el => !el.dtime))
}
export const createCustomer = async(req, res) => {
    try {
        const body = req.body
        const customer = {...body, ctime: Date.now(), mtime: Date.now() }
        const newCustomer = new ModelCustomer(customer)
        await newCustomer.save()
        res.status(200).json(newCustomer)
    } catch (error) {
        res.status(400).json(error.message)
    }
}
export const updateCustomer = async(req, res) => {
    try {
        const customer = await ModelCustomer.findOne({ _id: req.query.id })
        const newCustomer = await ModelCustomer.findOneAndUpdate({ _id: customer._id }, {...req.body, mtime: Date.now() }, { new: true })
        res.status(200).json(newCustomer)
    } catch (error) {
        res.status(400).json(error.message)
    }
}
export const deleteCustomer = async(req, res) => {
    try {
        const customer = await ModelCustomer.findOne({ _id: req.query.id })
        await ModelCustomer.findOneAndUpdate({ _id: customer._id }, { dtime: Date.now() }, { new: true })
        res.status(200).json(1)
    } catch (error) {
        res.status(400).json(error.message)
    }
}