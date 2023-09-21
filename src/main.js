import 'dotenv/config' //Permite utilizar variables de entorno
import express from 'express';
import { __dirname } from './path.js';
import path from 'path';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import productRouter from './routes/products.routes.js'
import cartRouter from './routes/cart.routes.js'
import mongoose from 'mongoose'
import cartModel from './models/carts.models.js'


const app = express()
const PORT = 4001


const server = app.listen(PORT, () => {
	console.log(`Servidor desde puerto: ${PORT}`);
	console.log(`http://localhost:${PORT}`);
});
const io = new Server(server);



mongoose.connect(process.env.MONGO_URL)
    .then(async () => {
        console.log("BDD conectada")  
    })
    .catch((error) => console.log("Error en conexion con MongoDB ATLAS: ", error))



app.use(express.json())
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)



//Middlewares

app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', engine()); 

app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views'));

// Conexión con socket.io


app.use('/static', express.static(path.join(__dirname, '/public')));

app.get('/static', (req, res) => {
	res.render('index', {
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


app.get('/static/products', (req, res) => {
	res.render('products', {
		rutaCSS: 'products',
		rutaJS: 'products',
	});
});


app.get('/static/carts', (req, res) => {
	res.render('carts', {
		rutaCSS: 'carts',
		rutaJS: 'carts',
	});
});


app.get('/static/carts/:cid', (req, res) => {
	const { cid } = req.params;
	cartId = cid;
	res.redirect('/static/carts');
});


app.get('*', (req, res) => {
	res.status(404).send('Error 404');
});



