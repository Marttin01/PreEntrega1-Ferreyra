import express,{ Router } from "express";
import { cartsRouter } from "./cartsRouter.js";
import { productsRouter } from "./productsRouter.js";


export const apiRouter = Router()

apiRouter.use(express.json())
apiRouter.use('/products', productsRouter)
apiRouter.use('/carts', cartsRouter)


