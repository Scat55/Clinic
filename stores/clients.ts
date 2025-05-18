export const useClientsStore = defineStore('client', () => {
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

	const getAllClients = async () => {
		loading.value = true;
		error.value = null;

		try {
			const response = await $fetch<Client[]>(`${getApiBase()}/clients`);

			clients.value = response.map(client => ({
				...client,
				status: client.status || 'Ожидание',
				doctor: client.doctor || 'Не назначена',
				service: client.service || 'Не назначена',
			}));
			loading.value = false;
		}
		catch (err) {
			error.value = err instanceof Error ? err.message : 'Ошибка при загрузке клиентов';
		}
	};

	const updateClientStatus = async (client: Client, id: number | string) => {
		loading.value = true;
		error.value = null;

		try {
			await $fetch<Client[]>(`${getApiBase()}/clients/${id}`, {
				method: 'PUT',
				body: client,
			});
		}
		catch (err) {
			error.value = err instanceof Error ? err.message : 'Ошибка при загрузке клиентов';
		}
	};

	const getClients = computed(() => {
		return clients.value.length;
	});

	return { clients, loading, error, createClient, getAllClients, updateClientStatus, getClients };
});
