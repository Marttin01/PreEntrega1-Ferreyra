import express,{ Router } from "express";
import { ProductManager } from "../ProductManager.js";
import crypto,{ randomUUID } from 'crypto'
import { Product } from "../Product.js";


export const productsRouter = Router()
productsRouter.use(express.json())

const pm = new ProductManager('./static/products.json')

productsRouter.get('/', async (req,res) => {
    const products = await pm.getProducts()
    res.json(products)
})

productsRouter.get('/:pid', async (req,res) => {
    const product = await pm.getProductById(req.params.pid)
    res.json(product)
})

productsRouter.post('/', async (req,res) => {
    let id
    let product
    try {
        id = randomUUID()
        product = new Product({
            id:id,
            ...req.body
        })
    } catch (error) {
        res.status(404).json({error:'Producto no encontrado'})
    }
    let agregado
    try {
        agregado = await pm.addProduct(product)
        res.json(agregado)
    } catch (error) {
        res.status(404).json({error:'Producto repetido'})
    }
})

productsRouter.put('/:pid', async (req,res) => {
    let newProduct
    try {
        newProduct = new Product ({
            id:req.params.pid,
            ...req.body
        })
    } catch (error) {
        res.status(404).json({error:'No encontrado'})   
    }
    let replaceProduct
    try {
        replaceProduct = await pm.editProduct(req.params.pid, newProduct)
        res.json(replaceProduct)
    } catch (error) {
        res.status(404).json({error:'No encontrado'})
    }
})

productsRouter.delete('/:pid', async (req,res) => {
    try {
        const product = await pm.deleteProductById(req.params.pid)
        res.json(product)
    } catch (error) {
        res.status(404).json({error:'No encontrado'})
    }
})