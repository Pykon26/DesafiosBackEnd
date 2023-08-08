import { promises as fs } from 'fs';

class ProductManager {

  constructor(path) {
    
    this.path = path;

  }
  

  async addProduct(product) {
    const products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
    if (products.find((producto) => producto.id === product.id)) {
      return "Producto ya agregado";
    }
    products.push(product);
    await fs.writeFile(this.path, JSON.stringify(products));
  }

  async getProducts() {
    const products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
    console.log(products);
  }

  async getProductById(id) {
    const products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
    const prod = products.find((producto) => producto.id === id);
    if (prod) {
      console.log(prod);
    } else {
      console.log("Producto no existe");
    }
  }

  async updateProduct(id, { title, description, price, thumbnail, code, stock }) {
    const products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
    const indice = products.findIndex((prod) => prod.id === id);

    if (indice !== -1) {
      products[indice].title = title;
      products[indice].description = description;
      products[indice].price = price;
      products[indice].thumbnail = thumbnail;
      products[indice].code = code;
      products[indice].stock = stock;
      await fs.writeFile(this.path, JSON.stringify(products));
    } else {
      console.log("Producto no encontrado");
    }
  }

  async deleteProduct(id) {
    const products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
    const prods = products.filter((prod) => prod.id !== id);
    await fs.writeFile(this.path, JSON.stringify(prods));
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

const producto1 = new Product("Arroz", "Rico", 1000, "", "p1", 10);
const producto2 = new Product("Pan", "Esponjoso", 1300, "", "p2", 13);
const productManager = new ProductManager("./products.json");

productManager.addProduct(producto1);
productManager.addProduct(producto2);

// console.log(productManager.getProducts());
// console.log(productManager.getProductById(2));

// productManager.addProduct(producto1);
// productManager.addProduct(producto2);

// productManager.getProducts();

// productManager.getProductById(1);
// productManager.getProductById(999); 

// productManager.updateProduct(1, { title: "Arroz Integral", price: 1200 });

// productManager.deleteProduct(2);

