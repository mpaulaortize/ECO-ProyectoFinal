import { router, socket } from "../routes.js";

export default function renderOrderStatusScreen() {
  const app = document.getElementById("app");
  app.innerHTML = `
        <h1>Estado de tu pedido</h1>
        <p>Esperando a que el barista prepare tu bebida...</p>
    `;

  socket.on("orderReady", (data) => {
    router.navigateTo("/pickup");
  });
}
