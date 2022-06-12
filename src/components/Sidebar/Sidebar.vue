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
	import AsideButtons from './AsideButtons.vue';

	import ProductsSidebar from './ProductsSidebar.vue';

	const menuItems = ref(menuOptions);
	const currentItem = ref('');
	const isCategoryDrawerOpen = ref(false);
	const isLoading = ref(true);

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
		label?.toLocaleLowerCase() === Resources.ABERTURAS && getApertures();

		label?.toLocaleLowerCase() === Resources.EQUIPAMENTO && getEquipments();

		label?.toLocaleLowerCase() === Resources.TERMINACIONES && getCompletions();
	};

	const closeCategoryDrawer = () => {
		isCategoryDrawerOpen.value = false;
		products.value = [];
		currentItem.value = '';
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

	const _getAction = (action: string) => {
		if (action === 'Fijar') return 'FIX';
		if (action === 'Borrar') return 'DELETE';
	};

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

	<AsideButtons v-if="isCategoryDrawerOpen" @clickBtn="clickBtn" />

	<ProductsSidebar
		v-if="products?.length"
		:products="products"
		:current-item="currentItem"
		:product="product"
		@go-to-categories="goToCategories"
	/>

</template>
