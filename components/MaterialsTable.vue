<template>
	<div class="p-8">
		<h1 class="text-2xl font-bold mb-6">
			Склад расходных материалов
		</h1>
		<div class="flex justify-between items-center mb-6">
			<InputText
				v-model="searchQuery"
				placeholder="Поиск по материалам"
				size="small"
				class="w-full p-2 border rounded-lg mr-4"
			/>
			<Button
				icon="pi pi-plus"
				class="p-button-success"
				size="small"
				@click="openAddModal"
			/>
		</div>

		<Card>
			<template #content>
				<DataTable
					:value="filteredMaterials"
					paginator
					:rows="5"
					table-style="min-width: 15rem"
				>
					<Column
						field="name"
						header="Название материала"
						class="text-sm"
					/>
					<Column
						field="quantity"
						header="Количество"
						class="text-sm"
					/>
					<Column
						field="unit"
						header="Единица измерения"
						class="text-sm"
					/>
					<Column
						field="lastDelivery"
						header="Дата последней поставки"
						class="text-sm"
					/>
					<Column
						field="supplier"
						header="Поставщик"
						class="text-sm"
					/>
					<Column header="Действия">
						<template #body="slotProps">
							<div class="flex">
								<Button
									icon="pi pi-pencil"
									class="p-button-rounded p-button-text p-button-primary mr-2"
									@click="openEditModal(slotProps.data)"
								/>
								<Button
									icon="pi pi-trash"
									class="p-button-rounded p-button-text p-button-danger"
									@click="confirmDelete(slotProps.data)"
								/>
							</div>
						</template>
					</Column>
				</DataTable>
			</template>
		</Card>

		<!-- Модальное окно для добавления материала -->
		<Dialog
			v-model:visible="displayAddModal"
			modal
			header="Добавить материал"
			:style="{ width: '50vw' }"
		>
			<div class="space-y-4">
				<InputText
					v-model="newMaterial.name"
					size="small"
					placeholder="Название материала"
					class="w-full"
				/>
				<InputNumber
					v-model="newMaterial.quantity"
					size="small"
					placeholder="Количество"
					class="w-full"
					:min="0"
				/>
				<InputText
					v-model="newMaterial.unit"
					size="small"
					placeholder="Единица измерения"
					class="w-full"
				/>
				<Calendar
					v-model="newMaterial.lastDelivery"
					placeholder="Дата последней поставки"
					date-format="dd.mm.yy"
					class="w-full"
					size="small"
				/>
				<InputText
					v-model="newMaterial.supplier"
					placeholder="Поставщик"
					class="w-full"
					size="small"
				/>
			</div>
			<template #footer>
				<Button
					label="Отмена"
					icon="pi pi-times"
					class="p-button-text"
					severity="danger"
					size="small"
					@click="closeAddModal"
				/>
				<Button
					label="Сохранить"
					icon="pi pi-check"
					class="p-button-success"
					size="small"
					@click="saveMaterial"
				/>
			</template>
		</Dialog>

		<!-- Модальное окно для редактирования материала -->
		<Dialog
			v-model:visible="displayEditModal"
			modal
			header="Редактировать материал"
			:style="{ width: '50vw' }"
		>
			<div class="space-y-4">
				<InputText
					v-model="selectedMaterial.name"
					placeholder="Название материала"
					class="w-full"
					size="small"
				/>
				<InputNumber
					v-model="selectedMaterial.quantity"
					placeholder="Количество"
					class="w-full"
					:min="0"
					size="small"
				/>
				<InputText
					v-model="selectedMaterial.unit"
					placeholder="Единица измерения"
					class="w-full"
					size="small"
				/>
				<Calendar
					v-model="selectedMaterial.lastDelivery"
					placeholder="Дата последней поставки"
					date-format="dd.mm.yy"
					class="w-full"
					size="small"
				/>
				<InputText
					v-model="selectedMaterial.supplier"
					placeholder="Поставщик"
					class="w-full"
					size="small"
				/>
			</div>
			<template #footer>
				<Button
					label="Отмена"
					size="small"
					severity="danger"
					icon="pi pi-times"
					class="p-button-text"
					@click="closeEditModal"
				/>
				<Button
					label="Сохранить"
					size="small"
					icon="pi pi-check"
					class="p-button-success"
					@click="updateMaterial"
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
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import ConfirmDialog from 'primevue/confirmdialog';

// Инициализация useConfirm
const confirm = useConfirm();

const materials = ref([
	{
		id: 1,
		name: 'Анестезия Ультракаин',
		quantity: 50,
		unit: 'шт',
		lastDelivery: '2023-10-01',
		supplier: 'ООО "МедСнаб"',
	},
	{
		id: 2,
		name: 'Стоматологические перчатки',
		quantity: 200,
		unit: 'пар',
		lastDelivery: '2023-09-25',
		supplier: 'ООО "ДенталПро"',
	},
	{
		id: 3,
		name: 'Пломбировочный материал Filtek',
		quantity: 30,
		unit: 'шт',
		lastDelivery: '2023-09-20',
		supplier: 'ООО "Стоматология РФ"',
	},
	{
		id: 4,
		name: 'Стерилизационные пакеты',
		quantity: 100,
		unit: 'шт',
		lastDelivery: '2023-09-15',
		supplier: 'ООО "МедТехника"',
	},
	{
		id: 5,
		name: 'Стоматологические маски',
		quantity: 300,
		unit: 'шт',
		lastDelivery: '2023-09-10',
		supplier: 'ООО "ДенталПро"',
	},
	{
		id: 6,
		name: 'Зубные щетки для проф. чистки',
		quantity: 150,
		unit: 'шт',
		lastDelivery: '2023-09-05',
		supplier: 'ООО "ДенталМир"',
	},
	{
		id: 7,
		name: 'Стоматологические зонды',
		quantity: 80,
		unit: 'шт',
		lastDelivery: '2023-08-30',
		supplier: 'ООО "МедИнструмент"',
	},
	{
		id: 8,
		name: 'Абразивные диски для полировки',
		quantity: 120,
		unit: 'шт',
		lastDelivery: '2023-08-25',
		supplier: 'ООО "ДенталПро"',
	},
	{
		id: 9,
		name: 'Стоматологические фартуки',
		quantity: 90,
		unit: 'шт',
		lastDelivery: '2023-08-20',
		supplier: 'ООО "МедСнаб"',
	},
	{
		id: 10,
		name: 'Антисептик для рук',
		quantity: 60,
		unit: 'л',
		lastDelivery: '2023-08-15',
		supplier: 'ООО "Стоматология РФ"',
	},
	{
		id: 11,
		name: 'Стоматологические иглы',
		quantity: 200,
		unit: 'шт',
		lastDelivery: '2023-08-10',
		supplier: 'ООО "МедТехника"',
	},
	{
		id: 12,
		name: 'Стоматологические салфетки',
		quantity: 500,
		unit: 'шт',
		lastDelivery: '2023-08-05',
		supplier: 'ООО "ДенталПро"',
	},
	{
		id: 13,
		name: 'Стоматологические боры',
		quantity: 100,
		unit: 'шт',
		lastDelivery: '2023-07-30',
		supplier: 'ООО "МедИнструмент"',
	},
	{
		id: 14,
		name: 'Стоматологические наконечники',
		quantity: 50,
		unit: 'шт',
		lastDelivery: '2023-07-25',
		supplier: 'ООО "ДенталМир"',
	},
	{
		id: 15,
		name: 'Стоматологические шприцы',
		quantity: 70,
		unit: 'шт',
		lastDelivery: '2023-07-20',
		supplier: 'ООО "МедСнаб"',
	},
	{
		id: 16,
		name: 'Стоматологические пинцеты',
		quantity: 40,
		unit: 'шт',
		lastDelivery: '2023-07-15',
		supplier: 'ООО "Стоматология РФ"',
	},
	{
		id: 17,
		name: 'Стоматологические зеркала',
		quantity: 60,
		unit: 'шт',
		lastDelivery: '2023-07-10',
		supplier: 'ООО "МедТехника"',
	},
	{
		id: 18,
		name: 'Стоматологические скальпели',
		quantity: 30,
		unit: 'шт',
		lastDelivery: '2023-07-05',
		supplier: 'ООО "ДенталПро"',
	},
	{
		id: 19,
		name: 'Стоматологические шпатели',
		quantity: 80,
		unit: 'шт',
		lastDelivery: '2023-06-30',
		supplier: 'ООО "МедИнструмент"',
	},
	{
		id: 20,
		name: 'Стоматологические каппы',
		quantity: 100,
		unit: 'шт',
		lastDelivery: '2023-06-25',
		supplier: 'ООО "ДенталМир"',
	},
]);

const searchQuery = ref('');
const displayAddModal = ref(false);
const displayEditModal = ref(false);
const newMaterial = ref({
	name: '',
	quantity: 0,
	unit: '',
	lastDelivery: new Date(),
	supplier: '',
});
const selectedMaterial = ref({});

// Фильтрация материалов
const filteredMaterials = computed(() => {
	if (!searchQuery.value) return materials.value;
	return materials.value.filter(material =>
		material.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
	);
});

// Открыть модальное окно добавления
const openAddModal = () => {
	newMaterial.value = { name: '', quantity: 0, unit: '', lastDelivery: new Date(), supplier: '' };
	displayAddModal.value = true;
};

// Закрыть модальное окно добавления
const closeAddModal = () => {
	displayAddModal.value = false;
};

// Сохранить новый материал
const saveMaterial = () => {
	materials.value.push({
		id: materials.value.length + 1,
		...newMaterial.value,
	});
	closeAddModal();
};

// Открыть модальное окно редактирования
const openEditModal = (material) => {
	selectedMaterial.value = { ...material };
	displayEditModal.value = true;
};

// Закрыть модальное окно редактирования
const closeEditModal = () => {
	displayEditModal.value = false;
};

// Обновить материал
const updateMaterial = () => {
	const index = materials.value.findIndex(m => m.id === selectedMaterial.value.id);
	if (index !== -1) {
		materials.value[index] = { ...selectedMaterial.value };
	}
	closeEditModal();
};

// Подтверждение удаления
const confirmDelete = (material) => {
	confirm.require({
		message: 'Вы уверены, что хотите удалить этот материал?',
		header: 'Подтверждение удаления',
		icon: 'pi pi-exclamation-triangle',
		acceptLabel: 'Да',
		rejectLabel: 'Нет',
		acceptProps: { size: 'small', severity: 'success' },
		rejectProps: { size: 'small', severity: 'danger' },
		accept: () => deleteMaterial(material),
	});
};

// Удалить материал
const deleteMaterial = (material) => {
	materials.value = materials.value.filter(m => m.id !== material.id);
};
</script>
