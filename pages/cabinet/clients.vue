<template>
	<div class="p-6 bg-gray-50 min-h-screen">
		<div class="max-w-7xl mx-auto">
			<!-- Заголовок и поиск -->
			<div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
				<div>
					<h1 class="text-2xl font-bold text-gray-800">
						Список пациентов
					</h1>
					<p class="text-gray-600">
						Всего записей: {{ isArchivedClient.length }}
					</p>
				</div>

				<div class="w-full md:w-64">
					<span class="p-input-icon-left w-full">
						<IconField>
							<InputIcon class="pi pi-search" />
							<InputText
								v-model="searchQuery"
								placeholder="Поиск пациентов..."
								class="w-full border"
								size="small"
							/>
						</IconField>
					</span>
				</div>
			</div>

			<!-- Уведомление если нет записей -->
			<div
				v-if="clients.length === 0"
				class="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-lg"
			>
				<i class="pi pi-info-circle mr-2" />
				Нет записей на приём. Новые записи будут появляться здесь после заполнения формы.
			</div>

			<!-- Таблица записей -->
			<DataTable
				v-else
				:value="isArchivedClient"
				striped-rows
				paginator
				:rows="5"
				:rows-per-page-options="[5, 10, 25, 50]"
				table-style="min-width: 100%"
				class="bg-white rounded-lg shadow overflow-hidden"
			>
				<Column
					header="Пациент"
					sortable
					style="width: 25%"
				>
					<template #body="{ data }">
						<div class="flex items-center">
							<Avatar
								:label="data.name.slice(0, 2)"
								class="mr-3 bg-blue-100 text-blue-800"
								size="large"
								shape="circle"
							/>
							<div>
								<p class="font-medium">
									{{ data.name }}
								</p>
								<p class="text-sm text-gray-500">
									{{ data.phone }}
								</p>
							</div>
						</div>
					</template>
				</Column>
				<Column
					field="service"
					header="Услуга"
					sortable
					style="width: 25%"
				/>
				<Column
					field="date"
					header="Дата приёма"
					sortable
					style="width: 20%"
				>
					<template #body="{ data }">
						{{ formatDateTime(data.date) }}
					</template>
				</Column>
				<Column
					header="Действия"
					style="width: 10%"
				>
					<template #body="{ data }">
						<Button
							icon="pi pi-folder-plus"
							text
							rounded
							severity="danger"
							aria-label="В архив"
							@click="confirmDelete(data)"
						/>
					</template>
				</Column>
			</DataTable>
		</div>

		<!-- Диалог подтверждения удаления -->
		<Dialog
			v-model:visible="deleteDialogVisible"
			header="Перенести в архив"
			:modal="true"
			style="width: 400px"
		>
			<div class="mb-4">
				Вы действительно хотите перенести в архив запись пациента <strong>{{ appointmentToDelete?.name }}</strong>?
			</div>
			<template #footer>
				<Button
					label="Отмена"
					icon="pi pi-times"
					text
					@click="deleteDialogVisible = false"
				/>
				<Button
					label="В архив"
					icon="pi pi-check"
					severity="danger"
					@click="deleteAppointment"
				/>
			</template>
		</Dialog>
	</div>
</template>

<script setup lang="ts">
import { useClientsStore } from '~/stores/clients.js';
import type Client from '@/types/clients.js';

// Данные
const appointments = ref<Client[]>([]);
const searchQuery = ref('');
const deleteDialogVisible = ref(false);
const appointmentToDelete = ref(null);

const clientStore = useClientsStore();
const { clients } = storeToRefs(clientStore);

const isArchivedClient = computed(() => clients.value.filter(client => !client.isArchive));

// Загрузка записей из localStorage
const loadAppointments = () => {
	appointments.value = clients;
};
// Форматирование даты и времени
const formatDateTime = (dateString) => {
	return	new Date(dateString).toLocaleString('ru-RU', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		timeZone: 'Europe/Moscow',
	});
};

// Подтверждение удаления
const confirmDelete = (client) => {
	appointmentToDelete.value = client;
	deleteDialogVisible.value = true;
};

// // Удаление записи
const deleteAppointment = () => {
	if (appointmentToDelete.value) {
		appointmentToDelete.value.isArchive = true;
		clientStore.updateClientStatus(appointmentToDelete.value, appointmentToDelete.value.id);
		deleteDialogVisible.value = false;
	}
};

// Инициализация
onMounted(() => {
	loadAppointments();
	clientStore.getAllClients();
});
</script>

<style scoped>
.p-avatar {
  font-weight: 600;
}
</style>
