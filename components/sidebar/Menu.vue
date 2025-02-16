<script setup lang="ts">
import type SidebarMenu from '~/types/sidebar-menu';

const items = ref<SidebarMenu[]>([
	{ title: 'Записи', link: '/cabinet/records', icon: 'pi pi-database' },
	{ title: 'Финансы', link: '/cabinet/finance', icon: 'pi pi-wallet' },
	{ title: 'Склад', link: '/cabinet/warehouse', icon: 'pi pi-warehouse' },
	{ title: 'Клиенты', link: '/cabinet/clients', icon: 'pi pi-users' },
	{ title: 'Аналитика', link: '/cabinet/analytics', icon: 'pi pi-chart-bar' },
]);
defineEmits(['close']);
</script>

<template>
	<div>
		<header class="flex items-center gap-2 p-4 hover:scale-[101%] transition cursor-pointer">
			<!--      <Logo class="text-blue-700" /> -->
			<nuxt-link
				to="/cabinet"
				class="lg:text-xl"
				@click="$emit('close')"
			>
				Клиника <span class="text-blue-700">Доверие</span>
			</nuxt-link>
		</header>
		<div class="px-4 grow">
			<div class="grid gap-4">
				<nuxt-link
					v-for="item in items"
					:key="item.title"
					:to="item.link"
					class="flex items-center gap-2 px-2 py-1 transition rounded cursor-pointer hover:bg-zinc-100"
					@click="$emit('close')"
				>
					<i
						:class="item.icon"
						style="font-size: 1.25rem"
					/>
					<span>{{ item.title }}</span>
				</nuxt-link>
			</div>
		</div>
	</div>
</template>
