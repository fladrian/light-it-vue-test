<script lang="ts" setup>
	import ProductList from './ProductList.vue';
	import ProductsHeader from './ProductsHeader.vue';
	const props = defineProps(['currentItem', 'product', 'products']);
</script>
<template>
	<aside
		class="w-[34%] h-screen bg-gray-100 absolute top-0 left-24 text-black pt-24 px-6 overflow-auto"
	>
		<ProductsHeader
			:current-item="currentItem"
			:product="product"
			@go-to-categories="$emit('goToCategories')"
		/>

		<ProductList :products="products" />
	</aside>
</template>
