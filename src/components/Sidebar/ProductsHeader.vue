<script setup lang="ts">
import chevronIcon from '../../assets/activo.png';

const props = defineProps(['currentItem', 'product'])
</script>
<template>
	<div
			@click="$emit('goToCategories')"
			class="font-light text-xs px-0 cursor-pointer text-gray-400 flex w-10 h-5 items-center hover:underline"
		>
			<img :src="chevronIcon" class="w-3 h-3 mx-auto mr-1" />
			{{ currentItem }}
		</div>

		<h2
			class="text-gray-600 text-xl mb-3 font-bold flex justify-between items-center"
		>
			{{ product }}
		</h2>
</template>