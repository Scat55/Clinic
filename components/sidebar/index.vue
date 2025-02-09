<script setup lang="ts">
const open = ref(false);
</script>

<template>
	<div>
		<div class="flex lg:hidden z-50 items-center justify-between w-full h-full p-4">
			<!--      <logo /> -->
			<span class="md:text-2xl">
				Клиника <span class="text-blue-700">Доверие</span>
			</span>
			<i
				class="pi pi-bars z-50 cursor-pointer left-2 top-2"
				@click="open = true"
			/>
			<div
				v-if="open"
				class="fixed top-0 left-0 z-50 w-full h-full bg-zinc-800"
			>
				<i
					class="pi pi-times absolute z-50 cursor-pointer right-4 top-4 text-white"
					@click="open = false"
				/>
				<SidebarMenu @close="open = false" />
			</div>
		</div>
		<div class="hidden lg:flex w-[250px] h-screen flex-col justify-between border-r shadow-md bg-zinc-800">
			<SidebarMenu />
			<div>
				USER ITEM
			</div>
		</div>
	</div>
</template>
