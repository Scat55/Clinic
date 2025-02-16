<script setup lang="ts">
import avatar from '@/app/assets/icons/testAvatar.jpg';

const isFetching = ref(true);

setTimeout(() => {
	isFetching.value = false;
}, 3000);

const cardValue = [
	{ title: 'Сегодня', description: '' },
	{ title: 'На завтра', description: '' },
	{ title: 'На месяц', description: '' },
];
</script>

<template>
	<div class="w-full gap-4">
		<header class="flex items-start justify-between">
			<div class="">
				<p class="text-xl text-zinc-400">
					Вся информация о ваших клиентах !
				</p>
				<h1 class="mt-2 text-[18px]">
					Личный кабинет
				</h1>
			</div>

			<div>
				<Skeleton
					v-if="isFetching"
					width="3rem"
					height="3rem"
					border-radius="50%"
				/>

				<Avatar
					v-if="!isFetching"
					:image="avatar"
					size="large"
					shape="circle"
				/>
			</div>
		</header>
		<main>
			<div class="flex flex-col gap-2 mt-8 lg:flex-row">
				<template v-if="isFetching">
					<Skeleton
						v-for="(item, idx) in 3"
						:key="idx"
						height="125px"
					/>
				</template>
				<template v-if="!isFetching">
					<Card
						v-for="card in cardValue"
						:key="card.title"
						class="w-full h-[125px] p-2"
					>
						<template #header>
							{{ card.title }}
						</template>
						<template #content>
							<p class="m-0">
								{{ card.description }}
							</p>
						</template>
					</Card>
				</template>
			</div>
		</main>
	</div>
</template>

<style scoped>
.p-avatar img  {
  object-fit: cover;
  object-position: center;
}
</style>
