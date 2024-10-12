import renderHomeScreen from "./screens/homeScreen.js";
import renderQuestionnaireScreen from "./screens/questionnaireScreen.js";
import renderRecommendationScreen from "./screens/recommendationScreen.js";
import renderOrderStatusScreen from "./screens/orderStatusScreen.js";
import renderPickupScreen from "./screens/pickupScreen.js";

const routes = {
  "/": renderHomeScreen,
  "/questionnaire": renderQuestionnaireScreen,
  "/recommendation": renderRecommendationScreen,
  "/orderStatus": renderOrderStatusScreen,
  "/pickup": renderPickupScreen,
};

export const router = {
  navigateTo: (path) => {
    if (routes[path]) {
      routes[path]();
    }
  },
};

// Inicializar la primera pantalla
window.onload = () => {
  router.navigateTo("/");
};
