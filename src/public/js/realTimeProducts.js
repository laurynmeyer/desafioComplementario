const socket = io()

const form = document.getElementById("formProduct")

form.addEventListener('submit', (e) => {
  e.preventDefault()
  console.log(e.target)
  const datForm = new FormData(e.target)
  const prod = Object.fromEntries(datForm)
  socket.emit('newProduct', prod)
  e.target.reset()
})