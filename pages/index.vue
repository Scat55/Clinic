<script setup lang="ts">
definePageMeta({
	layout: false,
});
const router = useRouter();

const testRout = () => {
	router.push('/cabinet');
};
</script>

<template>
	<Button
		label="Verify"
		@click="testRout"
	/>
</template>

<style scoped>

</style>
