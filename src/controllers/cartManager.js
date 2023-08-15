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
        return this.carts.find(cart => cart.id === cartId) || null;
    }

    async addProductToCart(cartId, productId) {
        const cart = await this.getCartById(cartId);
        console.log(cartId)
        if (!cart) {
            return false;
        }

        const existingProduct = cart.products.find(product => product.product === productId);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.products.push({ product: productId, quantity: 1 });
        }

        await this.saveCartsToFile();
        return true;
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
