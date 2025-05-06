// ~/services/formService.ts

type FormData = {
	name: string;
	phone: string;
	service: string;
	date: string;
	createdAt: string;
};

const STORAGE_KEY = 'appointmentForms';

export const FormService = {
	// Сохранить новую заявку
	async submitForm(formData: Omit<FormData, 'createdAt'>): Promise<void> {
		try {
			const forms = this.getStoredForms();
			const newForm: FormData = {
				...formData,
				createdAt: new Date().toISOString(),
			};
			forms.push(newForm);
			localStorage.setItem(STORAGE_KEY, JSON.stringify(forms));
		}
		catch (error) {
			console.error('Error saving form data:', error);
			throw error;
		}
	},

	// Получить все сохраненные заявки
	getStoredForms(): FormData[] {
		if (import.meta.client) {
			const storedData = localStorage.getItem(STORAGE_KEY);
			return storedData ? JSON.parse(storedData) : [];
		}
		return [];
	},

	// Очистить все заявки (для тестирования)
	clearForms(): void {
		if (import.meta.client) {
			localStorage.removeItem(STORAGE_KEY);
		}
	},
};
