import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';

export class CartManager {
  constructor(filePath) {
    this.filePath = filePath;
    this.carts = [];
  }

  async createCart() {
    const newCart = {
      id: uuidv4(),
      products: []
    };
    this.carts.push(newCart);
    await fs.writeFile(this.filePath, JSON.stringify(this.carts));

    return newCart;
  }

  async getCarts() {
        const cart = JSON.parse(await fs.readFile(this.filePath, 'utf-8'));
        return (cart)
   
}

  async getCartById(id) {
    const cart = JSON.parse(await fs.readFile(this.filePath, 'utf-8'));
    const car = cart.find((cart) => cart.id === id);
    if (car) {
        return(car);
      } else {
        return("Carrito no existe");
      }
  }


  async addProductToCart(cartId, productId) {
    
    const cart = await this.getCartById(cartId);
    if (!cart) return false;

    const products = JSON.parse(
      await fs.readFile("./src/models/productos.txt", "utf-8")
    );

    const product = products.find((producto) => producto.id === productId);
   
    if (product) {
      const productExist = cart.products.find((prod) => prod.id === productId);
      productExist
        ? productExist.quantity++
        : cart.products.push({ id: product.id, quantity: 1 });

      const carts = await this.getCarts();
      const cartIndex = carts.findIndex(
        (existingCart) => existingCart.id === cart.id
      );
      if (cartIndex !== -1) {
        carts[cartIndex] = cart;
        await fs.writeFile(this.filePath, JSON.stringify(carts));
      }
      return cart;
    } else {
      console.log("El producto no exite");
      return false;
    }
  }



  async eliminarCarrito(id) {
    try {
      const cartsData = JSON.parse(await fs.readFile(this.filePath, 'utf-8'));
      const updatedCarts = cartsData.filter(cart => cart.id !== id);
      await fs.writeFile(this.filePath, JSON.stringify(updatedCarts, null, 2));
      console.log('Carrito eliminado correctamente.');
    } catch (error) {
      console.error('Error al eliminar el carrito:', error);
    }
  }
  
}