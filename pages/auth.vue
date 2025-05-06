<!-- <template> -->
<!--	<div class="w-full h-screen"> -->
<!--		<div class="card h-full flex justify-center items-center"> -->
<!--			<Card class="w-full max-w-4xl"> -->
<!--				<template #title> -->
<!--					Авторизация -->
<!--				</template> -->
<!--				<template #content> -->
<!--					<form @submit.prevent="handleSubmit"> -->
<!--						<div class="flex flex-col gap-3 max-w-3xl"> -->
<!--							<div class="p-inputgroup"> -->
<!--								<span class="p-inputgroup-addon"> -->
<!--									<i class="pi pi-user" /> -->
<!--								</span> -->
<!--								<InputText -->
<!--									v-model="form.login" -->
<!--									placeholder="Логин" -->
<!--									required -->
<!--								/> -->
<!--							</div> -->

<!--							<div class="p-inputgroup"> -->
<!--								<span class="p-inputgroup-addon"> -->
<!--									<i class="pi pi-lock" /> -->
<!--								</span> -->
<!--								<Password -->
<!--									v-model="form.password" -->
<!--									placeholder="Пароль" -->
<!--									:feedback="false" -->
<!--									toggle-mask -->
<!--									required -->
<!--								/> -->
<!--							</div> -->

<!--							<Button -->
<!--								type="submit" -->
<!--								label="Войти" -->
<!--								icon="pi pi-sign-in" -->
<!--								:loading="loading" -->
<!--							/> -->
<!--						</div> -->
<!--					</form> -->
<!--				</template> -->
<!--			</Card> -->
<!--		</div> -->
<!--	</div> -->
<!-- </template> -->

<template>
	<div class="min-h-screen flex items-center justify-center bg-gray-100">
		<Toast />
		<div class="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
			<h2 class="text-2xl font-semibold text-center mb-6">
				Вход в систему
			</h2>
			<form
				class="space-y-4"
				@submit.prevent="handleSubmit"
			>
				<div>
					<label class="block mb-1 text-gray-700">Логин</label>
					<InputText
						v-model="form.login"
						type="text"
						class="w-full"
						required
					/>
				</div>
				<div class="w-full">
					<label class="block mb-1 text-gray-700">Пароль</label>
					<InputText
						v-model="form.password"
						type="password"
						class="w-full"
						required
					/>
				</div>
				<Button
					label="Войти"
					class="w-full mt-4"
					type="submit"
				/>
			</form>
		</div>
	</div>
</template>

<script setup>
import { useToast } from 'primevue/usetoast';

const form = ref({
	login: '',
	password: '',
});

definePageMeta({
	layout: false,
});

const toast = useToast();

const showError = () => {
	toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Неверный логин или пароль!', life: 3000 });
};

const handleSubmit = () => {
	if (form.value.login === 'admin' && form.value.password === '12345') {
		// Правильно сохраняем в localStorage (строка, а не объект)
		localStorage.setItem('auth', JSON.stringify({
			login: form.value.login,
			timestamp: Date.now(), // Добавляем метку времени
		}));

		// Перенаправляем в кабинет
		return navigateTo('/cabinet');
	}
	else {
		showError();
		form.value.password = '';
	}
};
</script>
