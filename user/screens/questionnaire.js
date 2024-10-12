import { router, socket } from "../routes.js";

export default function renderQuestionnaireScreen() {
  const app = document.getElementById("app");
  app.innerHTML = `
        <h1>Personaliza tu bebida</h1>
        <p>Responde las siguientes preguntas:</p>
        <!-- Aquí irán los inputs o botones para las preguntas -->
    `;

  // Aquí se manejarán las respuestas del usuario
  socket.on("questionsCompleted", (data) => {
    router.navigateTo("/recommendation");
  });
}
