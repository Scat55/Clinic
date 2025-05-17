<script setup lang="ts">
import { useClientsStore } from '#imports';
import { FormService } from '~/service/formService';

const clientStore = useClientsStore();
const { clients } = storeToRefs(clientStore);

const statuses = ref([
	{ name: 'Ожидание' },
	{ name: 'Подтвержден' },
	{ name: 'Отменен' },
]);

// Карточки статистики
const statCards = ref([
	{
		title: 'Записи сегодня',
		value: 0,
		icon: 'pi pi-calendar',
		color: 'bg-blue-100 text-blue-600',
	},
	{
		title: 'Новые пациенты',
		value: 0,
		icon: 'pi pi-user-plus',
		color: 'bg-green-100 text-green-600',
	},
	{
		title: 'Свободные окна',
		value: 0,
		icon: 'pi pi-clock',
		color: 'bg-orange-100 text-orange-600',
	},
]);

// Обновляем статистику
const updateStats = () => {
	const today = new Date().toISOString().split('T')[0];
	const allAppointments = FormService.getStoredForms();

	// Сегодняшние записи
	const todayAppointments = allAppointments.filter(
		app => new Date(app.date).toISOString().split('T')[0] === today,
	).length;

	// Новые пациенты (все уникальные имена)
	const uniqueNames = new Set(allAppointments.map(app => app.name));

	// Обновляем карточки
	statCards.value[0].value = todayAppointments;
	statCards.value[1].value = uniqueNames.size;
	statCards.value[2].value = Math.max(0, 10 - todayAppointments); // Предположим, что всего 10 слотов
};

// График статистики
const chartData = ref({
	labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
	datasets: [
		{
			label: 'Посещения',
			backgroundColor: '#3B82F6',
			data: [65, 59, 80, 81, 56, 55],
		},
	],
});

const chartOptions = ref({
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		legend: {
			display: false,
		},
	},
});

function onStatusChange(client, id) {
	// например, вызов обновления в сторе
	clientStore.updateClientStatus(client, client.id);
}

// Загружаем данные при монтировании
onMounted(() => {
	updateStats();
});

onBeforeMount(async () => {
	await clientStore.getAllClients();
});
</script>

<template>
	<div class="admin-dashboard space-y-6">
		<!-- Заголовок и пользователь -->
		<header class="flex items-center justify-between">
			<div>
				<h1 class="text-2xl font-bold text-gray-800">
					Панель управления
				</h1>
				<p class="text-gray-500">
					Обзор деятельности стоматологического центра
				</p>
			</div>

			<div class="flex items-center space-x-4">
				<Button
					icon="pi pi-bell"
					text
					rounded
					severity="secondary"
					aria-label="Уведомления"
				/>
				<Avatar
					image="/images/avatars/admin.jpg"
					size="large"
					shape="circle"
					class="border-2 border-white shadow"
				/>
			</div>
		</header>

		<!-- Карточки статистики -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
			<Card
				v-for="(card, index) in statCards"
				:key="index"
				class="hover:shadow-lg transition-shadow"
			>
				<template #content>
					<div class="flex justify-between items-center h-full">
						<div>
							<p class="text-sm font-medium text-gray-500 mb-1">
								{{ card.title }}
							</p>
							<p class="text-2xl font-bold">
								{{ card.value }}
							</p>
						</div>
						<div
							class="w-12 h-12 rounded-full flex items-center justify-center"
							:class="card.color"
						>
							<i
								:class="card.icon"
								class="text-xl"
							/>
						</div>
					</div>
				</template>
			</Card>
		</div>

		<!-- Основной контент -->
		<div class="grid grid-cols-1 mt-[30px] lg:grid-cols-3 gap-6">
			<!-- Ближайшие записи -->
			<Card class="lg:col-span-2">
				<template #title>
					Ближайшие записи
				</template>
				<template #subtitle>
					Сегодняшние приемы
				</template>

				<template #content>
					<div v-if="clients.length">
						<DataTable
							:value="clients"
							:rows="5"
							paginator
							class="p-datatable-sm"
							striped-rows
						>
							<Column
								header="Время"
								style="width: 20%"
							>
								<template #body="{ data }">
									{{ new Date(data.date).toLocaleString('ru-RU', {
										day: '2-digit',
										month: '2-digit',
										year: 'numeric',
										hour: '2-digit',
										minute: '2-digit',
										timeZone: 'Europe/Moscow',
									}) }}
								</template>
							</Column>
							<Column
								field="name"
								header="Пациент"
								style="width: 25%"
							/>
							<Column
								field="doctor"
								header="Врач"
								style="width: 25%"
							/>
							<Column
								field="service"
								header="Услуга"
								style="width: 20%"
							/>
							<Column
								header="Статус"
								field="status"
								style="width: 10%"
							>
								<template #body="{ data }">
									<Select
										v-model="data.status"
										:options="statuses"
										option-label="name"
										option-value="name"
										class="w-full md:w-56"
										@change="onStatusChange(data, data.id)"
									/>
								</template>
							</Column>
						</DataTable>
					</div>
					<div v-else>
						Записей нет
					</div>
				</template>
			</Card>

			<!-- График посещений -->
			<Card>
				<template #title>
					Посещаемость
				</template>
				<template #subtitle>
					За последние 6 месяцев
				</template>
				<template #content>
					<div class="h-64">
						<Chart
							type="bar"
							:data="chartData"
							:options="chartOptions"
						/>
					</div>
				</template>
			</Card>
		</div>
	</div>
</template>
