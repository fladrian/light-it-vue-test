import { defineStore } from 'pinia'
import { ICategory } from '../interfaces/ICategories';
import { GetApertures } from '../services/aperture.services';
import { GetCompletions } from '../services/completion.services';
import { GetEquipments } from '../services/equipment.services';

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useFortinures = defineStore('fornitures', {
  // other options...
	state: () => {
    return {
      categories:<ICategory[] | undefined>[],
      isLoading: true,
    }
  },
	actions: {
		async getApertures() {
			const data = await GetApertures();
			this.categories = data;
			this.isLoading = false;
		},
	
		async getCompletions() {
			const data = await GetCompletions();
			this.categories = data;
			this.isLoading = false;
		},
	
		async getEquipments() {
			const data = await GetEquipments();
			this.categories = data;
			this.isLoading = false;
		},

		setIsLoading(loadingStatus:boolean) {
			this.isLoading = loadingStatus
		},

		cleanCategories(){
			this.categories = []
		}
	}
})