import { promises as fs } from 'fs'

class ProductManager {
  constructor(filePath) {
    this.products = [];
    this.path = filePath;
  }

  async readData() {
    try {
      const consultarTXT = await fs.readFile(this.path, 'utf-8');
      this.products = JSON.parse(consultarTXT);
    } catch (error) {
      this.products = [];
    }
  }

  async saveData() {
    try {
      await fs.writeFile(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
    } catch (error) {
      console.error("Error saving data to file:", error);
      throw new Error("Error saving data to file");
    }
  }

  async getProducts() {
    await this.readData();
    return this.products;
  }

  async getProductById(id) {
    await this.readData();
    const product = this.products.find(prod => prod.id == id);
    return product || "Not Found";
  }

  async addProduct(product) {
    await this.readData();

    if (this.products.find(prod => prod.code == product.code)) {
      return "Code existing";
    }

    if (product.code != "" && product.stock >= 0) {
      this.products.push(product);
      await this.saveData();
    } else {
      return "without stock";
    }
  }

  async updateProduct(id, updatedFields) {
    await this.readData();

    const productIndex = this.products.findIndex(prod => prod.id == id);
    if (productIndex !== -1) {
      this.products[productIndex] = { ...this.products[productIndex], ...updatedFields };
      await this.saveData();
    } else {
      throw new Error("Product not found");
    }
  }

  async deleteProduct(id) {
    await this.readData();

    const initialLength = this.products.length;
    this.products = this.products.filter(prod => prod.id != id);

    if (this.products.length < initialLength) {
      await this.saveData();
    } else {
      throw new Error("Product not found");
    }
  }
}

class Product {
  constructor(title, description, price, thumbnail, code, stock) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
    this.id = Product.incrementarID();
  }

  static incrementarID() {
    if (this.idIncrement) {
      this.idIncrement++;
    } else {
      this.idIncrement = 1;
    }
    return this.idIncrement;
  }
}

// ejemplo de productos
const product1 = new Product("Notebook 1", "CORE I5 1173G7", 2000, "", "PO1", 4);
const product2 = new Product("Notebook 2", "CORE I7", 5000, "", "PO2", 5);
const product5 = new Product("Notebook 3", "CORE I7", 5000, "", "PO7", 5);

const productManager = new ProductManager('products.txt');

(async () => {
  await productManager.addProduct(product1);
  await productManager.addProduct(product2);
  await productManager.addProduct(product5);

  console.log(await productManager.getProducts());
  console.log(await productManager.getProductById(2));

  // modificar producto
  await productManager.updateProduct(5, { title: 'NotebooK 3', description: 'CORE I7-12345G9',price: 7000 });

  //Borrar producto
/**  await productManager.deleteProduct(5); **/

  console.log(await productManager.getProducts());
})();

