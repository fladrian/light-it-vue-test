<script lang="ts" setup>
import Product from './Product.vue';

const props = defineProps(['products'])
</script>


<template>
	<article class="flex gap-2 flex-wrap justify-around">
			<!-- <article
				class="hover:scale-95 transition duration-300 cursor-pointer pb-4"
				v-for="(product, idx) in products"
				:key="idx"
			>
				<div
					v-show="isImgLoading"
					class="h-full w-full flex justify-center items-center"
				>
					<Loader />
				</div>

				<div :class="[isImgLoading ? 'hidden' : 'block']">
					<img
						class="w-32 h-32 rounded-md object-cover"
						:src="product.img"
						@load="handleLoad"
						@error="handleError"
						v-show="!imgHasError"
					/>

				</div>
					<div
						class="h-32 w-32 flex justify-center items-center bg-gray-100 text-gray-400 text-sm text-center font-medium"
						v-show="imgHasError"
					>
						Imagen no disponible
					</div>

				<p class="text-center text-sm pt-1 font-light text-gray-900 border rounded-b-lg bg-gray-200 mt-[-4px]">
					{{ product.name }}
				</p>
			</article> -->
	<Product :products="products" />
	</article>
</template>
