import express from 'express'
import { getCustomer, getListCustomer, createCustomer, updateCustomer, deleteCustomer } from './customer.bll'
const customerApi = express.Router()

customerApi.get("/customer/get", getCustomer);
customerApi.get("/customer/list", getListCustomer);
customerApi.post("/customer/create", createCustomer);
customerApi.post("/customer/update", updateCustomer)
customerApi.get("/customer/delete", deleteCustomer)

export default customerApi