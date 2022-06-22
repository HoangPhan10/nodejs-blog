import { ModelProduct } from './product.js'

export const getListProduct = async(req, res) => {
    const products = await ModelProduct.find()
    res.status(200).json(products.filter(el => !el.dtime))
}

export const getProduct = async(req, res) => {
    if (req.query.id && req.query.name) {
        const product = await ModelProduct.findOne({ _id: req.query.id, name: req.query.name })
        res.status(200).json(product)
    } else if (req.query.id) {
        const product = await ModelProduct.findOne({ _id: req.query.id })
        res.status(200).json(product)
    } else {
        const product = await ModelProduct.findOne({ name: req.query.name })
        res.status(200).json(product)
    }
}

export const createProduct = async(req, res) => {
    try {
        const body = req.body
        const product = new ModelProduct(body)
        await product.save()
        res.status(200).json(product)
    } catch (e) {
        res.status(400).json(e.message)
    }
}

export const updateProduct = async(req, res) => {
    try {
        const product = await ModelProduct.findOne({ _id: req.query.id })
        const newProduct = await ModelProduct.findOneAndUpdate({ _id: product._id }, {...req.body, mtime: Date.now() }, { new: true })
        res.status(200).json(newProduct)
    } catch (e) {
        res.status(400).json(e.message)
    }
}

export const deleteProduct = async(req, res) => {
    try {
        const product = await ModelProduct.findOne({ _id: req.query.id })
        await ModelProduct.findOneAndUpdate({ _id: product._id }, {...req.body, dtime: Date.now() }, { new: true })
        res.status(200).json(1)
    } catch (e) {
        res.status(400).json(e.message)
    }
}