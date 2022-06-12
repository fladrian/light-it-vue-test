<script lang="ts" setup>
import plusIcon from '../assets/plus.png'
import minusIcon from '../assets/minus.png'
import arrowIcon from '../assets/Flecha.png'
import { notify } from "@kyvg/vue3-notification";
import { ref } from '@vue/reactivity'

const handleClick = (action:string) => {
		const actionMsg = `${action} button click` 

		console.info(actionMsg)

		notify({
			title: actionMsg,
			type:"success"
		});
}

</script>

<template>

<section class="flex w-48 h-32 bottom-4 right-0 absolute justify-center items-center">

			<article class="bg-white h-20 w-8 rounded-md flex flex-col justify-around items-center mr-6">
				<img class="w-5 h-5 block cursor-pointer hover:bg-gray-200 rounded-md" @click="handleClick('PLUS')" :src="plusIcon"/>
				<img class="w-5 h-5 block cursor-pointer hover:bg-gray-200 rounded-md" @click="handleClick('MINUS')" :src="minusIcon"/>
			</article>

			<section class="bg-white h-20 w-20 rounded-md flex flex-col justify-around items-center p-1">
				<img class="w-6 h-6 cursor-pointer hover:bg-gray-200 rounded-md" @click="handleClick('UP')" :src="arrowIcon" />
				
				<div class="flex justify-between w-full">
					<img class="w-6 h-6 cursor-pointer hover:bg-gray-200 rounded-md rotate-[-90deg]" @click="handleClick('LEFT')" :src="arrowIcon" direction='left'/>
					<img class="w-6 h-6 cursor-pointer hover:bg-gray-200 rounded-md rotate-90" @click="handleClick('RIGHT')" :src="arrowIcon" direction='right'/>
				</div>
				
				<img class="w-6 h-6 cursor-pointer hover:bg-gray-200 rounded-md rotate-180" @click="handleClick('DOWN')" :src="arrowIcon" direction='down'/>
			</section>
		</section>
	
</template>