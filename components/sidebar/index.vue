<script setup lang="ts">
const open = ref(false);
</script>

<template>
	<div class="flex flex-col">
		<!-- Мобильное меню -->
		<div class="flex lg:hidden z-50 items-center justify-between w-full h-full p-4">
			<!-- Иконка открытия меню -->
			<i
				class="pi pi-bars z-50 cursor-pointer left-2 top-2"
				@click="open = true"
			/>

			<!-- Затемнение фона при открытом меню -->
			<Transition name="fade">
				<div
					v-if="open"
					class="fixed inset-0 bg-black/50 z-40"
					@click="open = false"
				/>
			</Transition>

			<!-- Сам Sidebar -->
			<Transition name="slide">
				<div
					v-if="open"
					class="fixed top-0 left-0 z-50 w-[250px] h-full bg-white shadow-lg"
				>
					<i
						class="pi pi-times absolute z-50 cursor-pointer right-4 top-4 text-black"
						@click="open = false"
					/>
					<SidebarMenu @close="open = false" />
				</div>
			</Transition>
		</div>

		<!-- Десктопный Sidebar -->
		<div class="hidden lg:flex w-[250px] h-screen flex-col justify-between shadow-md bg-white">
			<SidebarMenu />
		</div>
	</div>
</template>

<style scoped>
/* Анимация появления сайдбара */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-enter-from {
  transform: translateX(-100%);
}

.slide-leave-to {
  transform: translateX(-100%);
}

/* Плавное затемнение фона */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
