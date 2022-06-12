<script lang="ts" setup>
import { Ref, ref } from 'vue';
import Loader from '../shared/Loader.vue';
const props = defineProps(['product'])
const isImgLoading = ref(true);
const imgHasError = ref();

	const handleLoad = () => {
		isImgLoading.value = false;
		imgHasError.value = false;
	};
	const handleError = () => {
		imgHasError.value = true;
		isImgLoading.value = false;
	};
</script>
<template >
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
</template>