<template>
    <section class='flex justify-center flex-col items-center '>
        <BaseCard class="flex justify-center items-center flex-col">
            <h1 class="text-purple-700 inline-block font-black text-2xl mb-6">Fill This Form :</h1>
            <div class=" mb-4 flex-wrap gap-4 ml-4 w-full ">
                <div class="w-full flex justify-center items-center flex-col mb-8">
                    <input v-model.trim="formData.name" placeholder="Name"
                        class="mr-12 border-2 h-10 border-violet-700 rounded indent-2 w-1/2  " />
                    <p v-if="formError.name" class="text-red-500 font-bold text-start w-1/2">{{ formError.name }}</p>
                </div>
                <div class="w-full flex justify-center items-center flex-col mb-8">
                    <input v-model.trim="formData.phone" placeholder="Phone"
                        class="mr-12 border-2 h-10 border-violet-700 rounded indent-2 w-1/2  "
                        :errorMessage="formError.phone" />
                    <p v-if="formError.phone" class="text-red-500 font-bold text-start w-1/2">{{ formError.phone }}
                    </p>
                </div>
                <div class="w-full flex justify-center items-center flex-col mb-8">
                    <input v-model.trim="formData.email" placeholder="Email"
                        class="mr-12 border-2 h-10 border-violet-700 rounded indent-2 w-1/2  "
                        :errorMessage="formError.email" />
                    <p v-if="formError.email" class="text-red-500 font-bold text-start w-1/2">{{ formError.email }}
                    </p>
                </div>
                <div class="w-full flex justify-center items-center flex-col mb-8">
                    <input type="email" v-model.trim="formData.address" placeholder="Address"
                        class="mr-12 border-2 h-10 border-violet-700 rounded indent-2  w-1/2 "
                        :errorMessage="formError.address" />
                    <p v-if="formError.address" class="text-red-500 font-bold text-start w-1/2">{{ formError.address }}
                    </p>
                </div>

            </div>
            <button @click.prevent="submitFormData"
                class="bg-violet-700 text-white font-bold py-2 px-4 text-xl rounded-xl ">Submit</button>
        </BaseCard>
        <button @click.prevent="goToFormDataPage"
            class="bg-violet-700 text-white font-bold py-2 px-4 text-xl rounded-xl ">Form Data</button>
    </section>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { debounce } from 'lodash'


const store = useStore();
const router = useRouter();
const formData = reactive({
    name: null,
    phone: null,
    email: null,
    address: null,
});
const formError = reactive({
    name: null,
    phone: null,
    email: null,
    address: null,
});
const formDataValid = ref(false);

function validateForm() {
    formDataValid.value = true;
    formError.name = ''
    formError.phone = ''
    formError.email = ''
    formError.address = ''

    if (!formData.name) {
        formError.name = 'Name Is Required'
        formDataValid.value = false
        return
    }
    if (!formData.phone) {
        formError.phone = 'Phone Number Is Required'
        formDataValid.value = false
        return
    }
    if (!formData.email) {
        formError.email = 'Email Id Is Required';
        formDataValid.value = false;
        return
    } else if (!formData.email.includes('@')) {
        formError.email = 'Please Check your Email ID';
        formDataValid.value = false;
        return
    }
    if (!formData.address) {
        formError.address = 'Address Is Required'
        formDataValid.value = false
        return
    }
}
const goToFormDataPage = () => {
    router.push('/form-data')
}

const submitFormData = debounce(async () => {
    await validateForm();
    if (!formDataValid.value) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        store.dispatch('formData/submitForm', formData).then(() => {
            router.push('/form-data');
        }).catch((error) => {
            console.error('Failed to submit form:', error);
        });
    }
}, 300)

</script>
