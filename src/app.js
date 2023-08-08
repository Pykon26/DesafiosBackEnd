import express from 'express';
import { ProductManager } from './desafio.js';

const app = express();

const PORT = 4000;

const manager = new ProductManager('./src/products.json');

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send('Hola bienvenidos');
});

app.get('/productos/:id', async (req, res) => {
	const prod = await manager.getProductById(parseInt(req.params.id));
    if (prod)
        res.send(prod)
    res.send("Producto no encontrado")
});

app.get('/productos', async (req, res) => {
	const { limit } = req.query;
	const prod = await manager.getProducts();
	limit ? res.send(prod.slice(0, limit)) : res.send(prod);
});

app.get('*', (req, res) => {
	res.send('Error 404');
});

app.listen(PORT, () => {
	console.log(`Server on PORT: ${PORT}
http://localhost:${PORT}`);
});
