<template>
    <section class="flex flex-col justify-center items-center">
        <table class="w-4/5 mt-6 justify-center items-center border-collapse border border-purple-700 mb-10">
            <thead>
                <tr>
                    <th class="border border-purple-700 p-2">Name</th>
                    <th class="border border-purple-700 p-2">Email</th>
                    <th class="border border-purple-700 p-2">Phone</th>
                    <th class="border border-purple-700 p-2">Address</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(data, index) in formData" :key="index">
                    <td class="border border-purple-700 p-2">{{ data.name }}</td>
                    <td class="border border-purple-700 p-2">{{ data.email }}</td>
                    <td class="border border-purple-700 p-2">{{ data.phone }}</td>
                    <td class="border border-purple-700 p-2">{{ data.address }}</td>
                </tr>
            </tbody>
        </table>
        <button @click.prevent="goBackToRegistrationPage"
            class="bg-violet-700 text-white font-bold py-2 px-4 text-xl rounded-xl ">New Registartion</button>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router';

const router = useRouter()
const formData = ref([])

const getFormData = () => {
    axios.get('https://coach-is-here-default-rtdb.firebaseio.com/technicalForm.json')
        .then((res) => {
            formData.value = res.data
        })
        .catch((error) => {
            console.error('Error fetching data:', error)
        })
}

const goBackToRegistrationPage = () => {
    router.push('/')
}

onMounted(getFormData)


</script>