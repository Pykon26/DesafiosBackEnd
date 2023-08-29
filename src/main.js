import express from 'express';
import routerProd from './routes/products.routes.js';
import routerCart from './routes/cart.routes.js';
import { __dirname } from './path.js';
import path from 'path';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import  ProductManager  from './controllers/ProductManager.js';

const app = express();

const PORT = 4005;

const productManager = new ProductManager('./src/models/productos.txt');

// Server
const server = app.listen(PORT, () => {
	console.log(`Servidor desde puerto: ${PORT}`);
	console.log(`http://localhost:${PORT}/static/`);
});

const io = new Server(server);

//Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', engine()); 

app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views'));

// Conexión con socket.io

io.on('connection', socket => {
	console.log('Conexión con Socket.io');
	
	socket.on('load', async () => {
		const products = await productManager.getProducts();
		socket.emit('products', products);
	});
	
	socket.on('newProduct', async product => {
		await productManager.addProduct(product);
		const products = await productManager.getProducts();
		socket.emit('products', products);
	});
});


app.use('/static', express.static(path.join(__dirname, '/public')));


app.get('/static', (req, res) => {
	res.render('home', {
		rutaCSS: 'index',
		rutaJS: 'index',
	});
});

app.get('/static/realtimeproducts', (req, res) => {
	res.render('realTimeProducts', {
		rutaCSS: 'realTimeProducts',
		rutaJS: 'realTimeProducts',
	});
});

app.get('*', (req, res) => {
	res.status(404).send('Error 404');
});

// Routes
app.use('/api/products', routerProd);
app.use('/api/carts', routerCart);



