// barista.js
const orderList = document.getElementById("orderList");
const socket = io("http://localhost:3000");

// Evento para recibir nuevos pedidos en tiempo real
socket.on("newOrder", (order) => {
  alert(`Nuevo pedido recibido de ${order.name}`);
  fetchOrders();
});

// Evento para recibir actualizaciones de estado de los pedidos
socket.on("orderStatusUpdated", (order) => {
  fetchOrders(); // Actualizamos la lista de pedidos
});

// Obtener todos los pedidos
async function fetchOrders() {
  try {
    const response = await fetch("http://localhost:3000/orders");
    const orders = await response.json();

    orderList.innerHTML = ""; // Limpiar la lista

    orders.forEach((order) => {
      const li = document.createElement("li");
      li.innerHTML = `
                <p><strong>${order.name}</strong> ha pedido un ${order.product} (${order.size}) con ${order.extra}</p>
                <p>Estado: ${order.status}</p>
                <button onclick="updateOrder(${order.id}, 'in_process')">Marcar como en proceso</button>
                <button onclick="updateOrder(${order.id}, 'ready')">Marcar como listo</button>
                <button onclick="updateOrder(${order.id}, 'delivered')">Marcar como entregado</button>
            `;
      orderList.appendChild(li);
    });
  } catch (error) {
    console.error("Error al obtener los pedidos:", error);
  }
}

// Actualizar el estado del pedido
async function updateOrder(orderId, newStatus) {
  try {
    const response = await fetch(
      `http://localhost:3000/update-order/${orderId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      }
    );

    const result = await response.json();
    console.log(result);

    // Actualizamos la lista de pedidos
    fetchOrders();
  } catch (error) {
    console.error("Error al actualizar el estado del pedido:", error);
  }
}

// Llamar a fetchOrders al cargar la página
fetchOrders();
