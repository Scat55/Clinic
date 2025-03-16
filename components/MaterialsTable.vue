<template>
	<div class="p-8">
		<h1 class="text-2xl font-bold mb-6">
			Склад расходных материалов
		</h1>

		<IconField>
			<InputIcon class="pi pi-search" />
			<InputText
				v-model="searchQuery"
				placeholder="Поиск по материалам"
				class="w-full"
			/>
		</IconField>
		<Card class="mt-6">
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
					/>
					<Column
						field="quantity"
						header="Количество"
					/>
					<Column
						field="unit"
						header="Единица измерения"
					/>
					<Column
						field="lastDelivery"
						header="Дата последней поставки"
					/>
					<Column
						field="supplier"
						header="Поставщик"
					/>
				</DataTable>
			</template>
		</Card>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue';
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

// TODO: Вынести в отдельный сервис
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

const filteredMaterials = computed(() => {
	if (!searchQuery.value) return materials.value;
	return materials.value.filter(material =>
		material.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
	);
});
</script>
