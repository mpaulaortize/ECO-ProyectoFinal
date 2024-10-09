// user.js
const form = document.getElementById("orderForm");
let orderId = null; // ID del pedido creado

const socket = io("http://localhost:3000");

// Evento para recibir actualizaciones en tiempo real del estado del pedido
socket.on("orderStatusUpdated", (order) => {
  if (order.id === orderId) {
    document.getElementById(
      "orderStatus"
    ).innerText = `Estado de tu pedido: ${order.status}`;
  }
});

// Enviar el pedido
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const product = document.getElementById("product").value;
  const size = document.getElementById("size").value;
  const extra = document.getElementById("extra").value;

  const orderData = {
    name,
    product,
    size,
    extra,
  };

  try {
    const response = await fetch("http://localhost:3000/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    const result = await response.json();
    console.log(result);

    // Guardamos el ID del pedido
    orderId = result.order.id;

    alert(`Pedido creado: ${result.order.product} para ${result.order.name}`);

    // Mostrar el estado inicial
    document.getElementById(
      "orderStatus"
    ).innerText = `Estado de tu pedido: ${result.order.status}`;
  } catch (error) {
    console.error("Error al enviar el pedido:", error);
  }
});
