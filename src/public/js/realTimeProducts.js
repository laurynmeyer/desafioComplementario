// Conexión con el servidor de Socket.IO
const socket = io();

// Obtener el formulario por su id
const form = document.getElementById("formProduct");

// Escuchar el evento de envío del formulario
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const datForm = new FormData(e.target);
  const prod = Object.fromEntries(datForm);
  socket.emit('newProduct', prod); // Enviar el nuevo producto al servidor
  e.target.reset(); // Limpiar el formulario
});

// // Conexión con el servidor de "products" para traer y mostrar los productos en tiempo real
socket.on('products', (products) => {
 const productsDiv = document.getElementById("productsDiv");
  productsDiv.innerHTML = "";

  //Recorrer los productos y generar el HTML para cada uno
  products.forEach((prod) => {
    productsDiv.innerHTML += `
      <div class="card" style="width: 18rem;">
        <img src="..." class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Title: ${prod.title}</h5>
          <p class="card-text">Id: ${prod.id}</p>
          <p class="card-text">Description: ${prod.description}</p>
          <p class="card-text">Price: ${prod.price}</p>
          <p class="card-text">Status: ${prod.status}</p>
          <p class="card-text">Code: ${prod.code}</p>
          <p class="card-text">Stock: ${prod.stock}</p>
          <a href="#" class="btn btn-primary">Comprar</a>
        </div>
      </div>`;
  });
});



// const productsDiv = document.getElementById("productsDiv");
// productsDiv.innerHTML = "";
// products.forEach((prod) => {
//   productsDiv.innerHTML += `
//       <div class="product-container shadow">
//         <p>Id: ${prod.id}</p>
//         <p>Title: ${prod.title}</p>
//         <p>Description: ${prod.description}</p>
//         <p>Price: ${prod.price}</p>
//         <p>Status: ${prod.status}</p>
//         <p>Code: ${prod.code}</p>
//         <p>Stock: ${prod.stock}</p>
//       </div>     
//       `;
// });
// });