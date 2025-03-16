<template>
	<div class="card">
		<DataTable
			:value="products"
			paginator
			:rows="5"
			:rows-per-page-options="[5, 10, 20, 50]"
			table-style="min-width: 15rem"
		>
			<Column
				field="name"
				header="Клиент"
			/>
			<Column
				field="doctor_name"
				header="Имя Врача"
			/>
			<Column
				field="date"
				header="Дата приема"
			/>
		</DataTable>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { RecordService } from '~/service/RecordService.js';

onMounted(() => {
	RecordService.getRecordMini().then(data => (products.value = data));
});

const products = ref();
</script>
