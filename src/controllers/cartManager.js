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
    const cartData  = await fs.readFile(this.filePath, 'utf-8');
  
    const cartIndex = this.carts.findIndex(cart => cart.id === cartId);
    if (cartIndex !== -1) {
      const cart = this.carts[cartIndex];
      const existingProductIndex = cart.products.findIndex(product => product.product === productId);
      
      if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].quantity += 1;
      } else {
        cart.products.push({ product: productId, quantity: 1 });
      }
  
      console.log('Producto agregado al carrito:', cart.products);
      try {
        await fs.writeFile(this.filePath, JSON.stringify(cart, null, 2));
        return true;
      } catch (error) {
        console.error('Error al guardar los carritos:', error);
        return false;
      }    
    } else {
      console.error('Carrito no encontrado.');
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