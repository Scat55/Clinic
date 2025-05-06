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
						Всего записей: {{ filteredAppointments.length }}
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
				v-if="appointments.length === 0"
				class="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-lg"
			>
				<i class="pi pi-info-circle mr-2" />
				Нет записей на приём. Новые записи будут появляться здесь после заполнения формы.
			</div>

			<!-- Таблица записей -->
			<DataTable
				v-else
				:value="filteredAppointments"
				striped-rows
				paginator
				:rows="10"
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
					field="createdAt"
					header="Дата записи"
					sortable
					style="width: 20%"
				>
					<template #body="{ data }">
						{{ formatDateTime(data.createdAt) }}
					</template>
				</Column>
				<Column
					header="Действия"
					style="width: 10%"
				>
					<template #body="{ data }">
						<Button
							icon="pi pi-trash"
							text
							rounded
							severity="danger"
							aria-label="Удалить"
							@click="confirmDelete(data)"
						/>
					</template>
				</Column>
			</DataTable>
		</div>

		<!-- Диалог подтверждения удаления -->
		<Dialog
			v-model:visible="deleteDialogVisible"
			header="Подтверждение удаления"
			:modal="true"
			style="width: 400px"
		>
			<div class="mb-4">
				Вы действительно хотите удалить запись пациента <strong>{{ appointmentToDelete?.name }}</strong>?
			</div>
			<template #footer>
				<Button
					label="Отмена"
					icon="pi pi-times"
					text
					@click="deleteDialogVisible = false"
				/>
				<Button
					label="Удалить"
					icon="pi pi-check"
					severity="danger"
					@click="deleteAppointment"
				/>
			</template>
		</Dialog>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useConfirm } from 'primevue/useconfirm';

const confirm = useConfirm();

// Данные
const appointments = ref([]);
const searchQuery = ref('');
const deleteDialogVisible = ref(false);
const appointmentToDelete = ref(null);

// Загрузка записей из localStorage
const loadAppointments = () => {
	const storedData = localStorage.getItem('appointmentForms');
	appointments.value = storedData ? JSON.parse(storedData) : [];
};

// Фильтрация записей
const filteredAppointments = computed(() => {
	if (!searchQuery.value) return appointments.value;

	const query = searchQuery.value.toLowerCase();
	return appointments.value.filter(appointment =>
		appointment.name.toLowerCase().includes(query)
		|| appointment.phone.includes(query)
		|| appointment.service.toLowerCase().includes(query),
	);
});

// Форматирование даты и времени
const formatDateTime = (dateString) => {
	const options = {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	};
	return new Date(dateString).toLocaleDateString('ru-RU', options);
};

// Подтверждение удаления
const confirmDelete = (appointment) => {
	appointmentToDelete.value = appointment;
	deleteDialogVisible.value = true;
};

// Удаление записи
const deleteAppointment = () => {
	if (appointmentToDelete.value) {
		const updatedAppointments = appointments.value.filter(
			a => a.createdAt !== appointmentToDelete.value.createdAt,
		);

		localStorage.setItem('appointmentForms', JSON.stringify(updatedAppointments));
		loadAppointments();
		deleteDialogVisible.value = false;

		// Можно добавить уведомление об успешном удалении
		console.log('Запись удалена:', appointmentToDelete.value);
	}
};

// Инициализация
onMounted(() => {
	loadAppointments();

	// Слушаем изменения в localStorage
	window.addEventListener('storage', () => {
		loadAppointments();
	});
});
</script>

<style scoped>
.p-avatar {
  font-weight: 600;
}
</style>
