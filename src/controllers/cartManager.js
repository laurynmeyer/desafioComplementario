import fs from 'fs-extra';

class CartManager {
  constructor(filePath) {
    this.carts = [];
    this.path = filePath;
  }

  async createCart() {
    const newCart = { id: this.incrementCartID(), products: [] };
    this.carts.push(newCart);
    await this.saveCartsToFile();
    return newCart;
  }

  async getCartById(cartId) {
    const carts = JSON.parse(await fs.readFile(this.path, "utf-8"));
    return carts.find((cart) => cart.id === cartId) || null;
  }

  async addProductToCart(cartId, productId) {
    const cart = await this.getCartById(cartId);
    console.log(cartId)
    if (!cart) {
      return false;
    }

    const products = JSON.parse(
      await fs.readFile("./src/models/products.json", "utf-8")
    );
    const product = products.find((product) => product.id === productId);
    if (product) {

      const existingProduct = cart.products.find(
        (product) => product.id === productId
      );
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        cart.products.push({ id: product.id, quantity: 1 });
      }
      const carts = await JSON.parse(await fs.readFile(this.path, "utf-8"));
      const cartIndex = carts.findIndex(
        (existingCart) => existingCart.id === cart.id
      );
      if (cartIndex !== -1) {
        carts[cartIndex] = cart;
        await fs.writeFile(this.path, JSON.stringify(carts));
      }
      return true;
    } else {
      console.log("Product does not exist");
      return false;
    }
    // return cart;
  }

  incrementCartID() {
    const maxId = this.carts.reduce((max, cart) => Math.max(max, cart.id), 0);
    return maxId + 1;
  }

  async saveCartsToFile() {
    await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
  }
}

export default CartManager;
