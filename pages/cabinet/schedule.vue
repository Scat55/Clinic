<template>
	<div class="p-4">
		<Toast />

		<!-- Фильтры и поиск -->
		<div class="flex flex-wrap items-center justify-between gap-4 mb-6">
			<h1 class="text-2xl font-bold mb-6">
				Расписание приёмов
			</h1>
			<Button
				label="Добавить запись"
				icon="pi pi-plus"
				size="small"
				@click="showAddDialog = true"
			/>
		</div>

		<!-- Календарь с русской локализацией -->
		<FullCalendar
			:options="calendarOptions"
			class="h-[500px] border border-blue-500 rounded-lg"
		/>

		<!-- Диалог добавления записи -->
		<Dialog
			v-model:visible="showAddDialog"
			header="Новая запись"
			:modal="true"
			class="modal"
		>
			<div class="grid gap-4">
				<Dropdown
					v-model="newAppointment.doctor"
					:options="doctors"
					option-label="name"
					placeholder="Выберите врача"
					:invalid="!newAppointment.doctor"
				/>
				<Calendar
					v-model="newAppointment.date"
					hour-format="24"
					placeholder="Время"
					show-time
					:invalid="!newAppointment.date"
					date-format="dd.mm.yy"
				/>
				<InputText
					v-model="newAppointment.name"
					placeholder="ФИО пациента"
					:invalid="!newAppointment.name"
				/>
				<InputMask
					v-model="newAppointment.phone"
					mask="+7(999)-999-99-99"
					placeholder="+7(999)-999-99-99"
					:invalid="!newAppointment.phone"
				/>
				<Textarea
					v-model="newAppointment.description"
					placeholder="Примечания"
					rows="3"
				/>
			</div>
			<template #footer>
				<Button
					label="Отмена"
					severity="secondary"
					@click="showAddDialog = false"
				/>
				<Button
					label="Сохранить"
					@click="saveAppointment"
				/>
			</template>
		</Dialog>

		<Dialog
			v-model:visible="showInfoDialog"
			modal
			header="Информация о пациенте"
			:style="{ width: '50rem' }"
			:breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
		>
			<div v-if="selectedClient">
				<p><strong>ФИО:</strong> {{ selectedClient.name }}</p>
				<p><strong>Телефон:</strong> {{ selectedClient.phone }}</p>
				<p><strong>Дата и время:</strong> {{ new Date(selectedClient.date).toLocaleString() }}</p>
				<p><strong>Врач:</strong> {{ selectedClient.doctor }}</p>
				<p><strong>Примечание:</strong> {{ selectedClient.description || '—' }}</p>
			</div>
			<div v-else>
				<p>Клиент не найден.</p>
			</div>
		</Dialog>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ruLocale from '@fullcalendar/core/locales/ru'; // Импорт русской локализации
import { useToast } from 'primevue/usetoast';
import { useClientsStore } from '~/stores/clients.js';
import 'v-calendar/style.css';

const toast = useToast();
const clientStore = useClientsStore();
const { clients } = storeToRefs(clientStore);

const showError = (severity: string, summary: string, detail: string) => {
	toast.add({ severity: severity, summary: summary, detail: detail, life: 3000 });
};

// Моковые данные
const doctors = ref([
	{ id: 1, name: 'Иванов А.В.' },
	{ id: 2, name: 'Петрова Е.С.' },
	{ id: 3, name: 'Сидоров Д.М.' },
]);

const appointments = ref([]);

const selectedDoctor = ref(null);
const selectedDate = ref(null);
const searchQuery = ref('');
const showAddDialog = ref(false);
const showInfoDialog = ref(false);
const selectedClient = ref(null);
const newAppointment = ref({
	doctor: null,
	date: null,
	name: '',
	description: '',
	phone: '',
});

// Настройки FullCalendar с русским языком
const calendarOptions = ref({
	plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
	initialView: 'timeGridWeek',
	headerToolbar: {
		left: 'prev,next today',
		center: 'title',
		right: 'dayGridMonth,timeGridWeek,timeGridDay',
	},
	events: appointments.value,
	slotMinTime: '08:00:00',
	slotMaxTime: '20:00:00',
	locales: [ruLocale], // Подключаем русскую локаль
	locale: 'ru', // Активируем русский язык
	buttonText: {
		today: 'Сегодня',
		month: 'Месяц',
		week: 'Неделя',
		day: 'День',
	},
	eventClick: (info) => {
		const clientId = info.event.id;
		selectedClient.value = clients.value.find(client => client.id == clientId);
		showInfoDialog.value = true;
	},
});

// Загрузка записей
const loadAppointments = async () => {
	try {
		// Преобразуем данные из API в формат FullCalendar
		appointments.value = clients.value.map((client) => {
			// Предполагаем, что прием длится 30 минут

			return {
				id: client.id,
				title: `${client.name} ${client.description ? client.description : ''}`,
				start: new Date(client.date),
				extendedProps: {
					phone: client.phone,
					status: client.status,
					doctor: client.doctor,
				},
			};
		});

		calendarOptions.value.events = appointments.value;
	}
	catch (error) {
		console.error('Ошибка загрузки записей:', error);
	}
};

// Сохранение новой записи
const saveAppointment = () => {
	if (!newAppointment.value.doctor || !newAppointment.value.date || !newAppointment.value.name || !newAppointment.value.phone) {
		showError('error', 'Ошибка', 'Заполните обязательные поля!');
		return;
	}

	const newEvent = {
		id: appointments.value.length + 1,
		name: `${newAppointment.value.name}`,
		date: newAppointment.value.date,
		phone: newAppointment.value.phone,
		doctor: newAppointment.value.doctor.name,
		status: 'Ожидание',
	};

	clientStore.createClient(newEvent);

	appointments.value.push(newEvent);
	calendarOptions.value.events = [...appointments.value];
	showAddDialog.value = false;
	newAppointment.value = { doctor: null, date: null, name: '', description: '' };
	showError('success', 'Успешно', `Запись создана`);
};

onBeforeMount(async () => {
	await clientStore.getAllClients();
	await loadAppointments();
});
</script>

 <style>
 .fc-button, .fc-button-primary {
  background-color: #3b82f6 !important;
  border: none !important;
  outline: none !important;
 }

 .fc-toolbar-chunk {
  padding: 10px;
 }

 @media (max-width: 984px) {
   .fc-header-toolbar, .fc-toolbar {
     display: flex;
     flex-direction: column;
   }
   .fc-toolbar-chunk:nth-child(1) {
     order: 1;
   }
   .fc-toolbar-chunk:nth-child(3) {
     order: 2;
   }
 }
 .modal{
   width: 400px;
 }
 </style>
