import { Router } from 'express'
import ProductManager from '../controllers/productManager.js'

const routerProds = Router()

const productManager = new ProductManager('./src/models/products.json')

routerProds.get('/', async (req, res) => {
    const { limit } = req.query

    const prods = await productManager.getProducts()
    const products = prods.slice(0, limit)
    res.status(200).send(products)
})

routerProds.get('/:pid', async (req, res) => {
    const { pid } = req.params; // Cambio aquí: utilizar pid en lugar de id
    const prod = await productManager.getProductByid(parseInt(pid))

    if (prod)
        res.status(200).send(prod)
    else
        res.status(404).send("non-existent product")
})

routerProds.post('/', async (req, res) => {
    const confirmation = await productManager.addProduct(req.body)

    if (confirmation)
        res.status(200).send("product created successfully")
    else
        res.status(400).send("existing product")
})

routerProds.put('/:pid', async (req, res) => {
    const { pid } = req.params; // Cambio aquí: utilizar pid en lugar de id
    const confirmation = await productManager.updateProduct(parseInt(pid), req.body)

    if (confirmation)
        res.status(200).send("product updated successfully")
    else
        res.status(400).send("product not found")
})

routerProds.delete('/:pid', async (req, res) => {
    const { pid } = req.params; // Cambio aquí: utilizar pid en lugar de id
    const confirmation = await productManager.deleteProduct(parseInt(pid))

    if (confirmation)
        res.status(200).send("product deleted successfully")
    else
        res.status(400).send("product not found")
})

export default routerProds


