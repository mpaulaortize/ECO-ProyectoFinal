import { router, socket } from "../routes.js";

export default function renderPickupScreen() {
  const app = document.getElementById("app");
  app.innerHTML = `
        <h1>¡Tu pedido está listo!</h1>
        <p>Ve al mostrador y muestra este código para recoger tu bebida.</p>
        <p>Código único: ${data.orderId}</p>
    `;
}
