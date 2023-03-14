import express,{ Router } from "express";
import { CartManager } from "../CartManager.js";
import crypto,{ randomUUID } from 'crypto'
import { Cart } from "../Cart.js";
import { CartProduct } from "../CartProduct.js";
import { Product } from "../Product.js";

export const cartsRouter = Router()
cartsRouter.use(express.json())

const cm = new CartManager('./static/carts.json')

cartsRouter.post('/', async (req,res) => {
    let id = randomUUID()
    let cart = new Cart({
        id:id,
        ...req.body
    })
    let agregado = await cm.addCart(cart)
    res.json(agregado)
})

cartsRouter.get('/:cid', async (req,res) => {
    let cartProduct = await cm.getCartProducts(req.params.cid)
    res.json(cartProduct)
})

cartsRouter.post('/:cid/product/:pid', async (req,res) => {
  let cartProduct = await cm.addProductCart(req.params.cid,req.params.pid)
  res.json(cartProduct)
})
