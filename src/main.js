import express from 'express';
import routerProd from './routes/products.routes.js';
import routerCart from './routes/cart.routes.js';
import { __dirname } from './path.js';
import path from 'path';

const PORT = 4001;
const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/products', routerProd);
app.use('/api/carts', routerCart);

app.use('/static', express.static(path.join(__dirname, '/public')));
app.get('*', (req, res) => {
    res.status(404).send('Error 404');
});

// Server
app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});