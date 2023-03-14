import { Cart } from "./Cart.js";
import fs from 'fs/promises'
import { CartProduct } from "./CartProduct.js";

export class CartManager {
    constructor(path) {
        this.path = path
        this.carts = []
        this.products = []
    }

    async read() {
        let json = await fs.readFile(this.path,"utf-8")
        this.carts = JSON.parse(json)
    }

    async write(){
        let json = JSON.stringify(this.carts, null, 1)
        await fs.writeFile(this.path, json)
    }

    async addCart ({id, products}) {
        await this.read()

        let exist = this.carts.find(c => c.id === id)
        if(exist) {
            throw new Error('Carrito ya creado anteriormente')
        }
        products = this.products
        const cart = new Cart({id, products})
        this.carts.push(cart)

        await this.write()
    }

    async getCartProducts (id) {
        await this.read()

        let exist = this.carts.find(c => c.id === id)
        if(!exist) {
            throw new Error('Carrito no encontrado')
        }
        return exist.products
    }

    async addProductCart ({cartId,productId}) {
        await this.read()
        let index = this.carts.findIndex((c) => c.id === cartId)
        if(index === -1) {
            throw new Error('Carrito no encontrado')
        }

        
        let exist = this.carts[index].products.find(p => p.id === productId)
        if(exist){
            this.carts[index].products.quantity++
        }else {
            let productCart = {product:productId,quantity:1}
            this.carts[index].products.push(productCart)
        }

        await this.write()
    }
    
    
    
}
