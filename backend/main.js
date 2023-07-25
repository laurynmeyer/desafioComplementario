class ProductManager {
  constructor() {
    this.products = [];
    /**Para lógica de contador y no repetición de code */
    this.productIdCounter = 1;
  }

  addProduct(product) {
    if (!this.validationProduct(product)) {
      console.log("Invalid product");
      return;
    }

    const newProduct = {
      ...product,
      id: this.productIdCounter,
    };

    this.products.push(newProduct);
    this.productIdCounter++;

  }

  /**método validación de campos y code del producto */
  validationProduct(product) {
    const required = ["title", "description", "price", "thumbnail", "code", "stock"];
    if (this.products.some((p) => p.code === product.code)) {
      return false;
    }
    for (const field of required) {
      if (!product[field]) {
        return false;
      }
    }
    return true;
  }

  getProducts() {
    return this.products;

  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      console.log("Not found");
      return null;
    }

    return product;
  }
};

const productManager = new ProductManager();

productManager.addProduct({
  title: "Notebook 1",
  description: "CORE I7-1145G7",
  price: 2000,
  thumbnail: "./imagenprueba1.jpg",
  code: "P01",
  stock: 7,
});

productManager.addProduct({
  title: "Notebook 2",
  description: "CORE I5-1173G7",
  price: 2000,
  thumbnail: "./imagenPrueba2.jpg",
  code: "P02",
  stock: 4,
});

productManager.addProduct({
  title: "Notebook 3",
  description: "CORE I3-1135G7",
  price: 2000,
  thumbnail: "./imagenPrueba3.jpg",
  code: "P03",
  stock: 3,
});

productManager.addProduct({
  title: "Notebook 4",
  description: "CORE I3-1135G7",
  thumbnail: "./imagenPrueba4.jpg",
  /**sin campo price "invalid product" */
  code: "P03",
  stock: 3,
});

/**Trae todos los productos */
const allProducts = productManager.getProducts()
console.log(allProducts)

/**Trae un producto por id */
const productById = productManager.getProductById(2)
console.log(productById)

/** En getProductById si no se encuentra el id es "Not found"*/
const noProduct = productManager.getProductById(6)
