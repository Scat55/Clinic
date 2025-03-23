<template>
	<Card>
		<template #content>
			<DataTable
				:value="products"
				paginator
				:rows="5"
				table-style="min-width: 15rem"
			>
				<Column
					field="name"
					header="Клиент"
					class="text-sm"
				/>
				<Column
					field="doctor_name"
					header="Имя Врача"
					class="text-sm"
				/>
				<Column
					field="date"
					header="Дата приема"
					class="text-sm"
				/>
			</DataTable>
		</template>
	</Card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { RecordService } from '~/service/RecordService.js';

onMounted(() => {
	RecordService.getRecordMini().then(data => (products.value = data));
});

const products = ref();
</script>
