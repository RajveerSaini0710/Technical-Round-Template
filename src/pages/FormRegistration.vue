<template>
    <section class='flex justify-center '>
        <BaseCard class="flex justify-center items-center flex-col">
            <h1 class="text-purple-700 inline-block font-black text-2xl mb-6">Fill This Form :</h1>
            <div class="flex flex-col items-center mb-4 flex-wrap gap-4 ml-4 w-full ">
                <input v-model="formData.name" placeholder="Name"
                    class="mr-12 border-2 h-10 border-violet-700 rounded indent-2 w-1/2  " />
                <p v-if="formError.name" class="text-red-500 font-bold text-start">{{ formError.name }}</p>
                <input v-model="formData.phone" placeholder="Phone"
                    class="mr-12 border-2 h-10 border-violet-700 rounded indent-2 w-1/2  "
                    :errorMessage="formError.phone" />
                <p v-if="formError.name" class="text-red-500 font-bold text-start">{{ formError.phone }}
                </p>
                <input v-model="formData.email" placeholder="Email"
                    class="mr-12 border-2 h-10 border-violet-700 rounded indent-2 w-1/2  "
                    :errorMessage="formError.email" />
                <p v-if="formError.name" class="text-red-500 font-bold text-start">{{ formError.email }}
                </p>
                <input v-model="formData.address" placeholder="Address"
                    class="mr-12 border-2 h-10 border-violet-700 rounded indent-2  w-1/2 "
                    :errorMessage="formError.address" />
                <p v-if="formError.name" class="text-red-500 font-bold text-start">{{ formError.address }}
                </p>

            </div>
            <button @click.prevent="submitFormData"
                class="bg-violet-700 text-white font-bold py-2 px-4 text-xl rounded-xl ">Submit</button>
        </BaseCard>
    </section>
</template>

<script>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router';
import axios from 'axios'
export default {
    components: {

    },
    setup() {
        const router = useRouter();
        const formData = reactive({
            name: null,
            phone: null,
            email: null,
            address: null
        })
        const formError = reactive({
            name: null,
            phone: null,
            email: null,
            address: null
        })
        const formDataValid = ref(false)
        function validateForm() {
            formDataValid.value = true
            if (!formData.name) {
                formError.name = "Please Enter Your Name"
                formDataValid.value = false
            }
            if (!formData.phone) {
                formError.phone = "Please Enter Your Phone Number"
                formDataValid.value = false
            }
            if (!formData.email) {
                formError.email = "Please Enter Your Email"
                formDataValid.value = false
            }
            if (!formData.address) {
                formError.address = "Please Enter Your Address"
                formDataValid.value = false
            }
        }
        function submitFormData() {
            validateForm()
            if (!formDataValid.value) {
                window.scrollTo({ top: 0, behavior: 'smooth' })
            } else {
                const payload = {
                    name: formData.name,
                    phone: formData.phone,
                    email: formData.email,
                    address: formData.address,
                }
                axios.post('https://saini-lifters-default-rtdb.firebaseio.com/form.json', payload).then((res) => {
                    console.log(res)
                    router.push('/form-data')
                })
            }
        }
        return { formData, formError, validateForm, submitFormData }
    },
}
</script>