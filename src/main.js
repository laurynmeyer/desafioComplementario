import express from 'express';
import routerProd from './routes/products.routes.js'
import routerCarts from './routes/carts.routes.js'; 
import fs from 'fs-extra';
import ProductManager  from './controllers/productManager.js';
import { Product } from './controllers/productManager.js';
import { __dirname } from './path.js';

const port = 4000;
const app = express();

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Routes
app.use('/static', express.static(__dirname + '/public'));
app.use('/api/products', routerProd);
app.use('/api/carts', routerCarts);

//Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});



