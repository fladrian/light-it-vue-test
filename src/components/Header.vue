<script lang="ts" setup>
import { selectOptions } from '../constants/SelectItems';
import { ref } from 'vue'
const options = ref(selectOptions)
</script>

<template>
		<div class="flex flex-col items-center px-40 z-10 absolute w-[100%] justify-center bg-gray-900 text-white h-20 md:flex md:flex-row md:justify-between md:items-center border-b-4 border-green-600">
			<div>
				<img class="min-w-[80px] w-20 h-10 mx-auto md:w-32 md:h-14" src="../assets/Logo.svg"/>
			</div>
			<div>
				<select class="h-6 w-52 cursor-pointer rounded px-2 border-gray-700 border-2 bg-white text-gray-900 text-lg md:h-8">
					<option v-for="({label, value}, idx) of options" :key="idx" :value="value">
						{{label}}
					</option>
				</select>
			</div>
		</div>
</template>