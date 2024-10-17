import { router, socket } from '../routes.js';

export default function renderHomeScreen() {
	const app = document.getElementById('app');
	app.innerHTML = `
        <h1>Bienvenido a Entre Amigos</h1>
        <p>Escanea el código QR para comenzar tu experiencia personalizada.</p>
    `;
}
