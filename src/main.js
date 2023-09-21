import 'dotenv/config' //Permite utilizar variables de entorno
import express from 'express';
import { __dirname } from './path.js';
import path from 'path';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import http from 'http';
import productRouter from './routes/products.routes.js'
import cartRouter from './routes/cart.routes.js'
import mongoose from 'mongoose'
import { orderModel } from './models/order.models.js'
import { userModel } from './models/users.models.js'
import cartModel from './models/carts.models.js'
const app = express()
const PORT = 4000

mongoose.connect(process.env.MONGO_URL)
    .then(async () => {
        console.log("BDD conectada")

        const resultado = await cartModel.findOne({ _id: "64f7be67ee3d47232d0cd8b5" })
        console.log(JSON.stringify(resultado))
  
    })
    .catch((error) => console.log("Error en conexion con MongoDB ATLAS: ", error))



app.use(express.json())
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})

const io = new Server(server);


//Middlewares

app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', engine()); 

app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views'));

// Conexión con socket.io


app.use('/static', express.static(path.join(__dirname, '/public')));



app.get('/static/realtimeproducts', (req, res) => {
	res.render('realTimeProducts', {
		rutaCSS: 'realTimeProducts',
		rutaJS: 'realTimeProducts',
	});
});

app.get('*', (req, res) => {
	res.status(404).send('Error 404');
});



