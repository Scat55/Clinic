<template>
	<Card
		class="cursor-pointer mb-4"
		@click="openModal"
	>
		<template #title>
			<div class="text-lg font-bold">
				{{ patient.firstName }} {{ patient.lastName }}
			</div>
		</template>
	</Card>

	<Dialog
		v-model:visible="displayModal"
		modal
		header="Информация о пациенте"
		maximizable
		:style="{ width: '50vw' }"
		:breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
	>
		<div class="space-y-2">
			<p><strong>Имя:</strong> {{ patient.firstName }}</p>
			<p><strong>Фамилия:</strong> {{ patient.lastName }}</p>
			<p><strong>Дата рождения:</strong> {{ patient.dateOfBirth }}</p>
			<p><strong>Лечащий врач:</strong> {{ patient.doctor }}</p>
			<p><strong>Дата последнего визита:</strong> {{ patient.lastVisit }}</p>
			<p><strong>Жалобы:</strong> {{ patient.complaints }}</p>
		</div>
	</Dialog>
</template>

<script setup>
import { ref } from 'vue';
import Dialog from 'primevue/dialog';

const props = defineProps({
	patient: {
		type: Object,
		required: true,
	},
});

const displayModal = ref(false);

const openModal = () => {
	displayModal.value = true;
};
</script>
