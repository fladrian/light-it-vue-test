<script lang="ts" setup>
	const props = defineProps(['product']);
</script>
<template>
	<p
		class="text-center text-sm pt-1 font-light text-gray-900 border rounded-b-lg bg-gray-200 mt-[-4px]"
	>
		{{ product.name }}
	</p>
</template>
