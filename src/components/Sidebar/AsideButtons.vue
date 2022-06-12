<template>
<div
			class="absolute right-2 w-32 h-14 top-24 flex flex-col justify-evenly items-center gap-2 sm:flex sm:flex-row sm:w-60 sm:right-4"
		>
			<button
				@click="$emit('clickBtn','Fijar')"
				class="bg-white w-28 h-10 rounded-md font-light text-gray-600"
			>
				Fijar
			</button>
			<button
				@click="$emit('clickBtn','Borrar')"
				class="bg-white w-28 h-10 rounded-md font-light text-gray-600"
			>
				Borrar
			</button>
		</div>
</template>