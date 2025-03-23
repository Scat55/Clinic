<template>
	<div>
		<h1 class="text-2xl font-bold mb-6">
			Финансы
		</h1>

		<!-- Общий баланс -->
		<div class="bg-white p-6 rounded-lg shadow-md mb-6">
			<h2 class="text-lg font-semibold mb-4">
				Общий баланс
			</h2>
			<div class="text-3xl font-bold">
				{{ totalBalance.toLocaleString() }} ₽
			</div>
		</div>

		<!-- Фильтры и кнопка добавления -->
		<div class="flex justify-between items-center mb-6">
			<div class="flex gap-4">
				<Dropdown
					v-model="selectedType"
					:options="operationTypes"
					option-label="label"
					option-value="value"
					placeholder="Тип операции"
					size="small"
				/>
				<InputText
					v-model="searchQuery"
					size="small"
					placeholder="Поиск по описанию"
					class="w-64 p-2 border rounded-lg"
				/>
			</div>
			<Button
				label="Добавить операцию"
				icon="pi pi-plus"
				size="small"
				class="p-button-success"
				@click="openAddModal"
			/>
		</div>

		<!-- Таблица финансовых операций -->
		<DataTable
			:value="filteredOperations"
			:paginator="true"
			:rows="5"
			paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
			current-page-report-template="Показано {first} - {last} из {totalRecords}"
			striped-rows
		>
			<Column
				field="date"
				header="Дата"
				class="text-sm"
			>
				<template #body="slotProps">
					{{ formatDate(slotProps.data.date) }}
				</template>
			</Column>
			<Column
				field="type"
				header="Тип операции"
				class="text-sm"
			>
				<template #body="slotProps">
					<Tag
						:value="slotProps.data.type === 'income' ? 'Доход' : 'Расход'"
						:severity="slotProps.data.type === 'income' ? 'success' : 'danger'"
					/>
				</template>
			</Column>
			<Column
				field="amount"
				header="Сумма"
				class="text-sm"
			>
				<template #body="slotProps">
					{{ slotProps.data.amount.toLocaleString() }} ₽
				</template>
			</Column>
			<Column
				field="category"
				header="Категория"
				class="text-sm"
			/>
			<Column
				field="description"
				header="Описание"
				class="text-sm"
			/>
			<Column header="Действия">
				<template #body="slotProps">
					<Button
						icon="pi pi-trash"
						class="p-button-rounded p-button-text p-button-danger"
						@click="confirmDelete(slotProps.data)"
					/>
				</template>
			</Column>
		</DataTable>

		<!-- Модальное окно для добавления операции -->
		<Dialog
			v-model:visible="displayAddModal"
			modal
			header="Добавить операцию"
			:style="{ width: '50vw' }"
		>
			<div class="space-y-4">
				<Dropdown
					v-model="newOperation.type"
					:options="operationTypes"
					option-label="label"
					option-value="value"
					placeholder="Тип операции"
					class="w-full"
					size="small"
				/>
				<Calendar
					v-model="newOperation.date"
					placeholder="Дата операции"
					date-format="dd.mm.yy"
					class="w-full"
					size="small"
				/>
				<InputNumber
					v-model="newOperation.amount"
					placeholder="Сумма"
					class="w-full"
					:min="0"
					size="small"
				/>
				<InputText
					v-model="newOperation.category"
					placeholder="Категория"
					class="w-full"
					size="small"
				/>
				<InputText
					v-model="newOperation.description"
					placeholder="Описание"
					class="w-full"
					size="small"
				/>
			</div>
			<template #footer>
				<Button
					label="Отмена"
					size="small"
					icon="pi pi-times"
					severity="danger"
					class="p-button-text"
					@click="closeAddModal"
				/>
				<Button
					label="Сохранить"
					size="small"
					icon="pi pi-check"
					class="p-button-success"
					:disabled="newOperation.type === '' && newOperation.date === ''"
					@click="saveOperation"
				/>
			</template>
		</Dialog>

		<!-- Диалог подтверждения удаления -->
		<ConfirmDialog />
	</div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useConfirm } from 'primevue/useconfirm';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Calendar from 'primevue/calendar';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import Dialog from 'primevue/dialog';
import ConfirmDialog from 'primevue/confirmdialog';

const confirm = useConfirm();

// Типы операций
const operationTypes = [
	{ label: 'Доход', value: 'income' },
	{ label: 'Расход', value: 'expense' },
];

// Данные финансовых операций
const operations = ref([
	{
		id: 1,
		type: 'income',
		date: '2023-10-01',
		amount: 50000,
		category: 'Лечение',
		description: 'Оплата за лечение пациента',
	},
	{
		id: 2,
		type: 'expense',
		date: '2023-09-25',
		amount: 15000,
		category: 'Оборудование',
		description: 'Покупка нового оборудования',
	},
	{
		id: 3,
		type: 'income',
		date: '2023-09-20',
		amount: 30000,
		category: 'Лечение',
		description: 'Оплата за лечение пациента',
	},
	{
		id: 4,
		type: 'expense',
		date: '2023-09-15',
		amount: 10000,
		category: 'Зарплата',
		description: 'Выплата зарплаты сотрудникам',
	},
]);

const searchQuery = ref('');
const selectedType = ref(null);
const displayAddModal = ref(false);
const newOperation = ref({
	type: '',
	date: new Date(),
	amount: 0,
	category: '',
	description: '',
});

// Фильтрация операций
const filteredOperations = computed(() => {
	return operations.value.filter((operation) => {
		const matchesType = selectedType.value ? operation.type === selectedType.value : true;
		const matchesSearch = operation.description
			.toLowerCase()
			.includes(searchQuery.value.toLowerCase());
		return matchesType && matchesSearch;
	});
});

// Общий баланс
const totalBalance = computed(() => {
	return operations.value.reduce((total, operation) => {
		return operation.type === 'income' ? total + operation.amount : total - operation.amount;
	}, 0);
});

// Форматирование даты
const formatDate = (dateString) => {
	const date = new Date(dateString);
	return date.toLocaleDateString('ru-RU');
};

// Открыть модальное окно добавления
const openAddModal = () => {
	newOperation.value = { type: '', date: new Date(), amount: 0, category: '', description: '' };
	displayAddModal.value = true;
};

// Закрыть модальное окно добавления
const closeAddModal = () => {
	displayAddModal.value = false;
};

// Сохранить новую операцию
const saveOperation = () => {
	operations.value.push({
		id: operations.value.length + 1,
		...newOperation.value,
	});
	closeAddModal();
};

// Подтверждение удаления
const confirmDelete = (operation) => {
	confirm.require({
		message: 'Вы уверены, что хотите удалить эту операцию?',
		header: 'Подтверждение удаления',
		icon: 'pi pi-exclamation-triangle',
		acceptLabel: 'Да',
		rejectLabel: 'Нет',
		acceptProps: { size: 'small', severity: 'success' },
		rejectProps: { size: 'small', severity: 'danger' },
		acceptClass: 'custom-accept-button',
		accept: () => deleteOperation(operation),
	});
};

// Удалить операцию
const deleteOperation = (operation) => {
	operations.value = operations.value.filter(op => op.id !== operation.id);
};
</script>
