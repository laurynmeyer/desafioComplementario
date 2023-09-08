import { Router } from "express";
import cartModel from "../models/carts.models.js";

const routerCarts = Router();
const CartModelInstance = new cartModel(); 

routerCarts.post("/", async (req, res) => {
  const newCart = await CartModelInstance.createCart(); 
  res.status(201).json(newCart);
});

routerCarts.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  const cart = await CartModelInstance.getCartById(parseInt(cid)); 
  if (cart) {
    res.status(200).json(cart);
  } else {
    res.status(404).send("Cart not found");
  }
});

routerCarts.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;

  const cartId = parseInt(cid);
  const productId = parseInt(pid);
  const success = await CartModelInstance.addProductToCart(cartId, productId); 

  if (success) {
    res.status(200).send("Product added to cart");
  } else {
    res.status(400).send("Failed to add product to cart");
  }
});

export default routerCarts;
