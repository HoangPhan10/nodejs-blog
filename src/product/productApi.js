import express from "express";
import { getProduct, getListProduct, createProduct, updateProduct, deleteProduct } from './product.bll'

const ProductApi = express.Router()

ProductApi.get("/product/list", getListProduct)
ProductApi.get("/product/get", getProduct)
ProductApi.post("/product/create", createProduct)
ProductApi.post("/product/update", updateProduct)
ProductApi.get("/product/delete", deleteProduct)

export default ProductApi