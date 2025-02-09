// plugins/primevue.js
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import 'primeicons/primeicons.css'; // Стили для иконок

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.use(PrimeVue);
	nuxtApp.vueApp.use(ToastService); // если нужны тосты
});
