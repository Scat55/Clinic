<template>
	<div class="p-8">
		<h1 class="text-2xl font-bold mb-6">
			Список пациентов
		</h1>
		<IconField>
			<InputIcon class="pi pi-search" />
			<InputText
				v-model="searchQuery"
				placeholder="Поиск"
				class="w-full border"
			/>
		</IconField>
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
			<PatientCard
				v-for="patient in filteredPatients"
				:key="patient.id"
				:patient="patient"
			/>
		</div>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue';
import InputText from 'primevue/inputtext';
import PatientCard from '~/components/PatientCard.vue';

const patients = ref([
	{
		id: 1,
		firstName: 'Иван',
		lastName: 'Иванов',
		dateOfBirth: '1990-05-15',
		doctor: 'Доктор Смит',
		lastVisit: '2023-10-01',
		complaints: 'Болит зуб',
	},
	{
		id: 2,
		firstName: 'Мария',
		lastName: 'Петрова',
		dateOfBirth: '1985-12-22',
		doctor: 'Доктор Джонс',
		lastVisit: '2023-09-25',
		complaints: 'Чувствительность к холодному',
	},
	// Добавьте больше пациентов по необходимости
]);

const searchQuery = ref('');

const filteredPatients = computed(() => {
	return patients.value.filter((patient) => {
		const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
		return fullName.includes(searchQuery.value.toLowerCase());
	});
});
</script>
