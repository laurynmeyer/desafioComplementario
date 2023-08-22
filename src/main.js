import express from 'express';
import multer from 'multer';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import routerProds from './routes/products.routes.js';
import routerCarts from './routes/carts.routes.js';
import fs from 'fs-extra';
import ProductManager from './controllers/productManager.js';
import { Product } from './controllers/productManager.js';
import { __filename, __dirname } from './path.js';
import path from 'path';

const port = 4000;
const app = express();

//Server
const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

const io = new Server(server)

//configuración multer
//cb es callback
//Date.now asigna fecha al nombre del archivo para hacerlo único. 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/public/img')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`)
  }
})


//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views'));

const upload = multer({ storage: storage });

//Conexión de Socket.io
io.on("connection", (socket) => {
  console.log("Conexión con Socket.io")

  socket.on('newProduct', (prod) => {
    console.log(prod)
    socket.emit("ProductCreated", "Product created successfully")
  })
})

//Routes
app.use('/static', express.static(path.join(__dirname, '/public')));
// si pongo app.use('/static', express.static(path.join(__dirname + '/public'))); Concatena la ruta 
//y al buscarlo en el navegador debería poner http://localhost:4000/static/index.html
//en upload, si quiero subir una imágen es single, para subir varias es fields
app.use('/api/products', routerProds);

//HBS
app.get('/static', (req, res) => {
  res.render('realTimeProducts', {
    rutaCSS: 'realTimeProducts',
    rutaJS: 'realTimeProducts',
  })
})



app.use('/api/carts', routerCarts);
app.post('/upload', upload.single('product'), (req, res) => {
  console.log(req.file)
  console.log(req.body)
  res.status(200).send("Imagen cargada")
})





