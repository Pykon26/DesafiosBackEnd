import { promises as fs } from 'fs';

export default class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
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
    return (products)
  }

  async getProductById(id) {
    const products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
    const prod = products.find((producto) => producto.id === id);
    if (prod) {
      return(prod);
    } else {
      return("Producto no existe");
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
      return("Producto no encontrado");
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
