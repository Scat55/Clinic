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
		@maximize="onMaximize"
		@unmaximize="onUnmaximize"
	>
		<template #maximizeicon>
			<Button
				v-tooltip.bottom="'Рекомендации врача'"
				icon="pi pi-window-maximize"
				class="p-button-text p-button-rounded p-button-plain"
				size="small"
			/>
		</template>
		<div class="space-y-2">
			<p><strong>Имя:</strong> {{ patient.firstName }}</p>
			<p><strong>Фамилия:</strong> {{ patient.lastName }}</p>
			<p><strong>Дата рождения:</strong> {{ patient.dateOfBirth }}</p>
			<p><strong>Лечащий врач:</strong> {{ patient.doctor }}</p>
			<p><strong>Дата последнего визита:</strong> {{ patient.lastVisit }}</p>
			<p><strong>Жалобы:</strong> {{ patient.complaints }}</p>

			<div v-if="isMaximized">
				<div class="mt-4">
					<strong> Здесь будут рекомендации врача</strong>
				</div>
			</div>
		</div>
	</Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Dialog from 'primevue/dialog';
import Tooltip from 'primevue/tooltip'; // Импортируем директиву для тултипов

const props = defineProps({
	patient: {
		type: Object,
		required: true,
	},
});

const displayModal = ref(false);
const isMaximized = ref(false);
const openModal = () => {
	displayModal.value = true;
};

const onMaximize = () => {
	isMaximized.value = true;
};

const onUnmaximize = () => {
	isMaximized.value = false;
};
</script>
