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
				setFormData(state, payload) {
					state.name = payload.name
					state.phone = payload.phone
					state.email = payload.email
					state.address = payload.address
					console.log(state, payload.name, payload.phone, payload.email, payload.address, 'form Data')
				},
				clearFormData(state) {
					state.name = null
					state.phone = null
					state.email = null
					state.address = null
					console.log('clear form', state)
				},
			},
			actions: {
				submitForm(context, formData) {
					const payload = {
						name: formData.name,
						phone: formData.phone,
						email: formData.email,
						address: formData.address,
					}
					context.commit('setFormData', payload)
					context.commit('clearFormData')
					return axios.post('https://coach-is-here-default-rtdb.firebaseio.com/technicalForm.json', payload)
				},
			},
		},
	},
})

export default store
