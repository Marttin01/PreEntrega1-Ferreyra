import fs from 'fs/promises'
import { Product } from './Product.js'

export class ProductManager {
    constructor(path) {
        this.path = path
        this.products = []
    }

    async read () {
        let json = await fs.readFile(this.path,"utf-8")
        this.products = JSON.parse(json)
    }

    async write () {
        let json = JSON.stringify(this.products, null, 1)
        await fs.writeFile(this.path, json)
    }

    async getProducts () {
        await this.read ()
        return this.products
    }

    async addProduct ({id, title, description, code, price, status, stock, category, thumbnail}) {
        await this.read()

        let exist = this.products.find(p => p.title === title)
        if(exist){
            throw new Error('Producto ya existente')
        }  
        const product = new Product ({id, title, description, code, price, status, stock, category, thumbnail})
        this.products.push(product)

        await this.write()
    }

    async getProductById (id) {
        await this.read ()
        let exist = this.products.find(p => p.id === id)
        if(!exist) {
            throw new Error('Producto no encontrado')
        }
        return exist
    }

    async deleteProductById (id) {
        await this.read()

        let exist = this.products.find(p => p.id === id)
        if(!exist) {
            throw new Error('Producto no encontrado')
        }
        let index = this.products.indexOf(exist)
        this.products.splice(index, 1)

        await this.write()
    }

    async editProduct (id, productEdit) {
        await this.read()

        let exist = this.products.find(p => p.id === id)
        if(!exist) {
            throw new Error('Producto no encontrado')
        }
        let index = this.products.indexOf(exist)

        this.products[index] = {
            ...this.products[index],
            ...productEdit
        }

        await this.write()
    }
}