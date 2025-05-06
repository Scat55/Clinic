export default defineNuxtRouteMiddleware((to) => {
	// Игнорируем главную страницу и страницу авторизации
	if (to.path === '/' || to.path === '/auth') return;

	if (import.meta.client) {
		const auth = localStorage.getItem('auth');

		// Проверяем наличие и валидность auth
		if (!auth) {
			return navigateTo('/auth');
		}

		try {
			// Дополнительная проверка, что auth - валидный JSON
			JSON.parse(auth);
		}
		catch {
			localStorage.removeItem('auth');
			return navigateTo('/auth');
		}
	}
});
