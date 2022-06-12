<script lang="ts" setup>
	import { Ref, ref } from 'vue';
	import { Resources } from '../../constants/Enums';
	import { menuOptions } from '../../constants/MenuItems';
	import { ICategory, Items } from '../../interfaces/ICategories';
	import { GetApertures } from '../../services/aperture.services';
	import { GetCompletions } from '../../services/completion.services';
	import { GetEquipments } from '../../services/equipment.services';
	import chevronIcon from '../../assets/activo.png';
	import Loader from '../shared/Loader.vue';
	import { notify } from '@kyvg/vue3-notification';

	const menuItems = ref(menuOptions);
	const currentItem = ref('');
	const isCategoryDrawerOpen = ref(false);
	const isLoading = ref(true);
	const isImgLoading = ref(true);
	const imgHasError = ref();

	const categories: Ref<ICategory[] | undefined> = ref([]);
	const products: Ref<Items[] | undefined> = ref([]);
	const product = ref('');

	const activeItem = (label: string) => {
		currentItem.value = label;
		isCategoryDrawerOpen.value = true;
		callService(label);
		categories.value = [];
		products.value = [];
	};

	const callService = (label: string) => {
		isLoading.value = true;
		isImgLoading.value = true;
		label?.toLocaleLowerCase() === Resources.ABERTURAS && getApertures();

		label?.toLocaleLowerCase() === Resources.EQUIPAMENTO && getEquipments();

		label?.toLocaleLowerCase() === Resources.TERMINACIONES && getCompletions();
	};

	const closeCategoryDrawer = () => {
		isCategoryDrawerOpen.value = false;
		products.value = []
		currentItem.value = ''
	};

	const getApertures = async () => {
		const data = await GetApertures();
		categories.value = data;
		isLoading.value = false;
	};

	const getCompletions = async () => {
		const data = await GetCompletions();
		categories.value = data;
		isLoading.value = false;
	};

	const getEquipments = async () => {
		const data = await GetEquipments();
		categories.value = data;
		isLoading.value = false;
	};

	const getProducts = (name: string, productsArray: Items[]) => {
		products.value = productsArray;
		product.value = name;
	};

	const goToCategories = () => {
		products.value = [];
	};

	const handleLoad = () => {
		isImgLoading.value = false;
		imgHasError.value = false;
	};
	const handleError = () => {
		imgHasError.value = true;
		isImgLoading.value = false;
	};

	const _getAction = (action:string) => {
		if(action === 'Fijar') return 'FIX'
		if(action === 'Borrar') return 'DELETE'
	}

	const clickBtn = (action: string) => {
		const actionMsg = `${_getAction(action)} button click`;

		console.info(actionMsg);

		notify({
			title: actionMsg,
			type: 'success',
		});
	};
</script>

<template>
	<section
		class="flex flex-col justify-center items-center w-24 h-screen text-gray-800 bg-white"
	>
		<article
			class="flex flex-col justify-center items-center cursor-pointer w-full h-20"
			:class="
				currentItem === label &&
				'bg-gray-100 relative rounded-lg before:absolute before:bottom-[-12%] before:h-[18px] before:w-full before:rounded-r-full before:bg-white before:left-0 after:absolute after:top-[-8%] after:h-[18px] after:w-full after:rounded-r-full after:bg-white'
			"
			v-for="({ icon, label }, idx) in menuItems"
			:key="idx"
			@click="activeItem(label)"
		>
			<img class="w-7 h-7 mx-auto" :src="icon" />
			<p class="text-center text-gray-500 text-xs">
				{{ label }}
			</p>
		</article>
	</section>

	<aside
		v-if="isCategoryDrawerOpen"
		class="w-[34%] h-screen bg-gray-100 absolute top-0 left-24 text-black pt-24 px-6"
	>
		<h2
			class="text-gray-600 text-xl mb-3 font-bold flex justify-between items-center"
		>
			{{ currentItem }}
			<Loader v-show="isLoading" />
		</h2>

		<div
			class="flex justify-between items-center mx-auto bg-white px-4 py-2 rounded-xl mb-2 cursor-pointer hover:bg-gray-300 transition-colors duration-300"
			:key="idx"
			@click="getProducts(name, items)"
			v-for="({ name, items }, idx) in categories"
		>
			<h2 class="text-gray-500 font-normal">
				{{ name }}
			</h2>
			<img :src="chevronIcon" class="w-4 h-4 mx-auto rotate-180 mr-0" />
		</div>

		<button
			class="w-6 h-24 absolute right-[-20px] bg-gray-100 rounded-tr-full rounded-br-full top-72 overscroll-y-contain"
			@click="closeCategoryDrawer"
		>
			<img :src="chevronIcon" class="w-4 h-4 mx-auto" />
		</button>
	</aside>

			<div
			class="absolute right-2 w-32 h-14 top-24 flex flex-col justify-evenly items-center gap-2 sm:flex sm:flex-row sm:w-60 sm:right-4"
			v-if="isCategoryDrawerOpen"
		>
			<button
				@click="clickBtn('Fijar')"
				class="bg-white w-28 h-10 rounded-md font-light text-gray-600"
			>
				Fijar
			</button>
			<button
				@click="clickBtn('Borrar')"
				class="bg-white w-28 h-10 rounded-md font-light text-gray-600"
			>
				Borrar
			</button>
		</div>

	<aside
		v-if="products?.length"
		class="w-[34%] h-screen bg-gray-100 absolute top-0 left-24 text-black pt-24 px-6 overflow-auto"
	>
		<div
			@click="goToCategories"
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

		<article class="flex gap-2 flex-wrap justify-around">
			<article
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
			</article>
		</article>
	</aside>
</template>
