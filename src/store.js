// store/index.js
import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
	modules: {
		formData: {
			namespaced: true,
			state: () => ({
				name: null,
				phone: null,
				email: null,
				address: null,
			}),
			mutations: {
				setFormData(state, formData) {
					state.name = formData.name
					state.phone = formData.phone
					state.email = formData.email
					state.address = formData.address
				},
				clearFormData(state) {
					state.name = null
					state.phone = null
					state.email = null
					state.address = null
				},
			},
			actions: {
				submitForm({ commit, state }) {
					const payload = {
						name: state.name,
						phone: state.phone,
						email: state.email,
						address: state.address,
					}
					return axios.post('https://saini-lifters-default-rtdb.firebaseio.com/form.json', payload)
				},
			},
		},
	},
})

export default store
