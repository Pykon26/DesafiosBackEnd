import { Router } from 'express';
import { CartManager } from '../controllers/cartManager.js';

const cartManager = new CartManager('./src/models/cart.txt');

const routerCart = Router();

routerCart.post('/', async (req, res) => {
    const newCart = await cartManager.createCart();
    res.status(201).send(newCart);
});

routerCart.get('/', async (req, res) => {
    const carts = await cartManager.getCarts();

    if (carts.length === 0) {
        res.status(404).send('No hay carritos creados');
    } else {
        res.status(200).json(carts);
    }
});


routerCart.get('/:cid', async (req, res) => {
    const  cid  = req.params.cid;
    const cart = await cartManager.getCartById(cid);

    if (cart) {
        res.status(200).send(cart);
    } else {
        res.status(404).send("Carrito no encontrado");
    }
});

routerCart.delete('/:cid', async (req, res) => {
    const cartId = req.params.cid;
    const confirmation = await cartManager.deleteCart(cartId);
  
    if (confirmation) {
      res.status(200).send('Carrito eliminado correctamente.');
    } else {
      res.status(404).send('Carrito no encontrado.');
    }
  });

routerCart.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const success = await cartManager.addProductToCart(cid, pid);
    if (success) {
        res.status(201).send("Producto agregado al carrito correctamente");
    } else {
        res.status(404).send("Carrito no encontrado");
    }
});

export default routerCart;