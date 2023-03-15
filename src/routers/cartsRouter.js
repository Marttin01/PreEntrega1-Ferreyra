import express,{ Router } from "express";
import { CartManager } from "../CartManager.js";
import crypto,{ randomUUID } from 'crypto'
import { Cart } from "../Cart.js";
import { Product } from "../Product.js";

export const cartsRouter = Router()
cartsRouter.use(express.json())

const cm = new CartManager('./static/carts.json')

cartsRouter.post('/', async (req,res) => {
    let id;
    let cart;
    try {
        id = randomUUID()
        cart = new Cart({
            id:id,
            ...req.body
        })
    } catch (error) {
        res.status(404).json({error:'No encontrado'})
    }
    let agregado;
    try {
        agregado = await cm.addCart(cart)
        res.json(agregado)
        
    } catch (error) {
        res.status(404).json({error:'No encontrado'})
    }
})

cartsRouter.get('/:cid', async (req,res) => {
    let cartProduct;
    try {
        cartProduct = await cm.getCartProducts(req.params.cid)
        res.json(cartProduct)
    } catch (error) {
        res.status(404).json({error:'No encontrado'})   
    }
})

cartsRouter.post('/:cid/product/:pid', async (req,res) => {
    let cartProduct;
    try {
        cartProduct = await cm.addProductCart(req.params.cid,req.params.pid)
        res.json(cartProduct)  
    } catch (error) {
        res.status(404).json({error:'No encontrado'})   
    }
})
