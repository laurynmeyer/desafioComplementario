import { Router } from 'express';
import CartManager from '../controllers/cartManager.js';

const routerCarts = Router();
const cartManager = new CartManager('./src/models/carts.json');

routerCarts.post('/', async (req, res) => {
  const newCart = await cartManager.createCart();
  res.status(201).json(newCart);
});

routerCarts.get('/:cid', async (req, res) => {
  const { cid } = req.params;

  console.log("CID value:", cid);

  const cart = await cartManager.getCartById(parseInt(cid));

  console.log("Cart retrieved:", cart);

  if (cart) {
    res.status(200).json(cart);
  } else {
    res.status(404).send("Cart not found");
  }
});

routerCarts.post('/:cid/product/:pid', async (req, res) => {
  const { cid, pid } = req.params;

  const cartId = parseInt(cid);
  const productId = parseInt(pid);

  const cart = await cartManager.getCartById(cartId);

  if (!cart) {
    return res.status(404).send("Cart not found");
  }

  const success = await cartManager.addProductToCart(cartId, productId);

  if (success) {
    res.status(200).send("Product added to cart");
  } else {
    res.status(400).send("Failed to add product to cart");
  }
});


export default routerCarts;
