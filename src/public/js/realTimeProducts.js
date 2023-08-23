const socket = io()

const form = document.getElementById("formProduct")

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const datForm = new FormData(e.target)
  const prod = Object.fromEntries(datForm)
  socket.emit('newProduct', prod)
  e.target.reset()
})

socket.on('ProductCreated', (product) => {
  updateProductList(product);
});

function updateProductList(product) {
  const productList = document.getElementById('product-list');
  const newProductItem = document.createElement('li');
  newProductItem.textContent = `${product.title} - ${product.price}`;
  productList.appendChild(newProductItem);
}
