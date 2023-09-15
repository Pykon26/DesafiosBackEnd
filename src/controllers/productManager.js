import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';

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

    product.id = uuidv4();
    product.status = true; 
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

  async updateProduct(id, updatedFields) {
    let products = JSON.parse(await fs.readFile(this.path, "utf-8"));

    let foundIndex = products.findIndex((item) => item.id === id);

    if (foundIndex === -1) {
      console.log("No se encontro el producto con el ID especificado");
      return null;
    }

    let updatedProduct = { ...products[foundIndex], ...updatedFields };
    products[foundIndex] = updatedProduct;

    await fs.writeFile(this.path, JSON.stringify(products));

    console.log("Producto actualizado");
    return updatedProduct;
  }

  async deleteProduct(id) {
    const products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
    const prods = products.filter((prod) => prod.id !== id);
    await fs.writeFile(this.path, JSON.stringify(prods));
  }


}

// class Product {

//   constructor(title, description, price, thumbnail, code, stock) {
//     this.title = title;
//     this.description = description;
//     this.price = price;
//     this.thumbnail = thumbnail;
//     this.code = code;
//     this.stock = stock;
//     this.id = Product.incrementarID();
//   }

//   static incrementarID() {
//     if (this.idIncrement) {
//       this.idIncrement++;
//     } else {
//       this.idIncrement = 1;
//     }
//     return this.idIncrement;
//   }
// }
