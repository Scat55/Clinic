import { defineStore } from 'pinia';

interface Client {
	id?: number;
	name: string;
	phone?: string;
	service: string;
	date: string;
}

export const useClientsStore = defineStore('clients', () => {
	// Состояние
	const clients = ref<Client[]>([]);
	const loading = ref(false);
	const error = ref<string | null>(null);

	// Получение базового URL API
	const getApiBase = () => {
		// Для SSR используем runtimeConfig
		if (import.meta.server) {
			const config = useRuntimeConfig();
			return config.public.apiBase;
		}
		// Для клиентской стороны используем env или дефолтное значение
		return process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3001';
	};

	// Действия
	const fetchClients = async () => {
		loading.value = true;
		error.value = null;
		try {
			const { data } = await useFetch<Client[]>(`${getApiBase()}/clients`);
			if (data.value) {
				clients.value = data.value;
			}
		}
		catch (err) {
			error.value = err instanceof Error ? err.message : 'Ошибка при загрузке клиентов';
		}
		finally {
			loading.value = false;
		}
	};

	const createClient = async (clientData: Omit<Client, 'id'>) => {
		loading.value = true;
		error.value = null;
		try {
			const { data } = await useFetch<Client>(`${getApiBase()}/clients`, {
				method: 'POST',
				body: clientData,
			});

			if (data.value) {
				clients.value.push(data.value);
				return data.value;
			}
		}
		catch (err) {
			error.value = err instanceof Error ? err.message : 'Ошибка при создании клиента';
			throw err;
		}
		finally {
			loading.value = false;
		}
	};

	// Геттеры
	const getClientById = (id: number) => {
		return clients.value.find(client => client.id === id);
	};

	const sortedClients = computed(() => {
		return [...clients.value].sort((a, b) => a.name.localeCompare(b.name));
	});

	return {
		clients,
		loading,
		error,
		fetchClients,
		createClient,
		getClientById,
		sortedClients,
	};
});
