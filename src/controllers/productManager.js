import fs from 'fs-extra';


export default class ProductManager {
  constructor(filePath) {
    this.products = [];
    this.path = filePath;
  }

  static incrementarID() {
    if (this.idIncrement) {
      this.idIncrement++;
    } else {
      this.idIncrement = 1;
    }
    return this.idIncrement;
  }

  async getLastUsedID() {
    const prods = await this.getProducts();
    if (prods.length === 0) {
      return 0;
    }
    const lastProduct = prods[prods.length - 1];
    return lastProduct.id;
  }


  async getProducts() {
    try {
      const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'));
      return prods;
    } catch (error) {
      throw new Error("Error while reading products data: " + error.message);
    }
  }

  async addProduct(product) {
    const prods = await this.getProducts();
    const existProd = prods.find(existingProduct => existingProduct.code === product.code);

    if (existProd) {
      return false;
    } else {
      const lastUsedID = await this.getLastUsedID();
      const newID = lastUsedID + 1;
      product.id = newID;
      prods.push(product);
      await fs.writeFile(this.path, JSON.stringify(prods));
      return true;
    }
  }

  async getProductByid(id) {
    const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'));
    const product = prods.find(prod => prod.id === id);
    return product || null;
  }

  async updateProduct(id, updatedData) {
    const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'));
    const index = prods.findIndex(prod => prod.id === id);

    if (index !== -1) {
      prods[index] = { ...prods[index], ...updatedData };
      await fs.writeFile(this.path, JSON.stringify(prods));
      return true;
    } else {
      return false;
    }
  }

  async deleteProduct(id) {
    const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'));
    const index = prods.findIndex(prod => prod.id === id);

    if (index !== -1) {
      prods.splice(index, 1);
      await fs.writeFile(this.path, JSON.stringify(prods));
      return true;
    } else {
      return false;
    }
  }
}

export class Product {
  constructor(title, description, price, status, thumbnail, code, stock) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.status = status;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
}
  /** 
  async registration() {
    const productManager = new ProductManager('./src/models/products.json'); 
    const product1 = new Product("Dell Latitud 7470", "Procesador Intel. Memoria RAM de 16GB. Pantalla LED de 15. Es antirreflejo", 870000, true, "Sin imagen", "Dell01", 17);
    const product2 = new Product("Dell Latitud 7460", "Procesador Intel. Memoria RAM de 8GB. Pantalla LED de 15. Es antirreflejo", 960000, true, "Sin imagen", "Dell02", 12);
    const product3 = new Product("Dell Latitud 7420", "Procesador Intel. Memoria RAM de 4GB. Pantalla LED de 14. Es antirreflejo", 760000, true, "Sin imagen", "Dell03", 8);

    await productManager.addProduct(product1);
    await productManager.addProduct(product2);
    await productManager.addProduct(product3);
  }
}

const product = new Product(); 
product.registration(); 
**/

