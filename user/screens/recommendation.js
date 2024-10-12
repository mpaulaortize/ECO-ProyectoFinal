import { router, socket } from "../routes.js";

export default function renderRecommendationScreen() {
  const app = document.getElementById("app");
  app.innerHTML = `
        <h1>Tu recomendación</h1>
        <p>Aquí está tu bebida recomendada:</p>
        <!-- Mostrar la recomendación aquí -->
        <button id="confirmOrder">Confirmar Pedido</button>
    `;

  const confirmOrderButton = document.getElementById("confirmOrder");
  confirmOrderButton.addEventListener("click", () => {
    socket.emit("orderConfirmed");
    router.navigateTo("/orderStatus");
  });
}
