<script setup lang="ts">
	import ProductImage from './ProductImage.vue';
	import ProductLabel from './ProductLabel.vue';
	const props = defineProps(['products']);
</script>

<template>
	<article
		class="hover:scale-95 transition duration-300 cursor-pointer pb-4"
		v-for="(product, idx) in products"
		:key="idx"
	>
		<ProductImage :product="product" />

		<ProductLabel :product="product" />
	</article>
</template>
