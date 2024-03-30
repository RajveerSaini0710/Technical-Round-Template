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
//     data() {
//         return {
//             isFormEditPage: this.$route.path.includes('edit'),
//             formEditDataId: this.$route.params.id || 0,
//             isFormDataValid: true,
//             formError: {
//                 firstName: '',
//                 middleName: '',
//                 lastName: '',
//                 phoneNumber: '',
//                 email: '',
//                 selectedDays: '',
//                 selectedGender: '',
//                 dob: ''
//             },
//             weekdays: [
//                 { id: "mon", name: "Monday" },
//                 { id: "tue", name: "Tuesday" },
//                 { id: "wed", name: "Wednesday" },
//                 { id: "thur", name: "Thursday" },
//                 { id: "fri", name: "Friday" },
//             ],
//             genders: [
//                 { id: "male", name: "Male" },
//                 { id: "female", name: "Female" }
//             ],
//             data: {
//                 firstName: null,
//                 middleName: null,
//                 lastName: null,
//                 phoneNumber: null,
//                 email: null,
//                 selectedDays: [],
//                 selectedGender: null,
//                 dob: null
//             }
//         };
//     },
//     mounted() {
//         if (this.isFormEditPage) {
//             this.getFormData()
//         }
//     },
//     methods: {
//         getFormData() {
//             axios.get(`https://saini-lifters-default-rtdb.firebaseio.com/form/${this.formEditDataId}.json`)
//                 .then((res) => {
//                     const formData = res.data
//                     this.data.firstName = formData.first_name
//                     this.data.middleName = formData.middle_name
//                     this.data.lastName = formData.last_name
//                     this.data.phoneNumber = formData.phone_number
//                     this.data.email = formData.email_id
//                     this.data.selectedDays = formData.selected_days
//                     this.data.selectedGender = formData.selected_gender
//                     this.data.dob = formData.dob.slice('T', 10)
//                 })
//         },
//         validateForm() {
//             this.isFormDataValid = true
//             this.formError = {
//                 firstName: '',
//                 middleName: '',
//                 lastName: '',
//                 phoneNumber: '',
//                 email: '',
//                 selectedDays: '',
//                 selectedGender: '',
//                 dob: ''
//             }
//             if (!this.data.firstName) {
//                 this.formError.firstName = 'Please Enter The First Name'
//                 this.isFormDataValid = false
//             }
//             if (!this.data.middleName) {
//                 this.formError.middleName = 'Please Enter The Middle Name'
//                 this.isFormDataValid = false
//             }
//             if (!this.data.lastName) {
//                 this.formError.lastName = 'Please Enter The Last Name'
//                 this.isFormDataValid = false
//             }
//             if (!this.data.phoneNumber) {
//                 this.formError.phoneNumber = 'Please Enter The Phone Number'
//                 this.isFormDataValid = false
//             }
//             if (!this.data.email) {
//                 this.formError.email = 'Please Enter The Email Id'
//                 this.isFormDataValid = false
//             }
//             if (this.data.selectedDays.length === 0) {
//                 this.formError.selectedDays = 'Please Select the days'
//                 this.isFormDataValid = false
//             }
//             if (!this.data.selectedGender) {
//                 this.formError.selectedGender = 'Please Select The Gender'
//                 this.isFormDataValid = false
//             }
//             if (!this.data.dob) {
//                 this.formError.dob = 'Please Select Your Date Of Birth'
//                 this.isFormDataValid = false
//             }
//         },
//         submitFormData() {
//             this.validateForm()
//             if (!this.isFormDataValid) {
//                 window.scrollTo({ top: 0, behavior: 'smooth' })
//             } else {
//                 const payload = {
//                     first_name: this.data.firstName,
//                     middle_name: this.data.middleName,
//                     last_name: this.data.lastName,
//                     phone_number: this.data.phoneNumber,
//                     email_id: this.data.email,
//                     selected_days: this.data.selectedDays,
//                     selected_gender: this.data.selectedGender,
//                     dob: this.data.dob
//                 }
//                 axios.post('https://saini-lifters-default-rtdb.firebaseio.com/form.json', payload)
//                     .then((res) => {
//                         console.log(res)
//                         this.$router.push({
//                             path: '/data'
//                         })
//                     })
//                     .catch((err) => {
//                         console.log(err);
//                     })
//             }
//         },
//         updateFormData() {
//             this.validateForm()
//             if (!this.isFormDataValid) {
//                 window.scrollTo({ top: 0, behavior: 'smooth' })
//             } else {
//                 const payload = {
//                     first_name: this.data.firstName,
//                     middle_name: this.data.middleName,
//                     last_name: this.data.lastName,
//                     phone_number: this.data.phoneNumber,
//                     email_id: this.data.email,
//                     selected_days: this.data.selectedDays,
//                     selected_gender: this.data.selectedGender,
//                     dob: this.data.dob
//                 }
//                 axios.patch(`https://saini-lifters-default-rtdb.firebaseio.com/form/${this.formEditDataId}.json`, payload)
//                     .then((res) => {
//                         console.log(res);
//                         this.$router.push('/data')
//                     }).catch((err) => {
//                         console.log(err);
//                     })
//             }
//         },

//         isLetter(e) {
//             let char = String.fromCharCode(e.keyCode); // Get the character
//             if (/^[A-Za-z]+$/.test(char)) return true; // Match with regex 
//             else e.preventDefault(); // If not match, don't add to input text
//         },
//         isNumber(e) {
//             e = (e) ? e : window.event;
//             var charCode = (e.which) ? e.which : e.keyCode;
//             if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
//                 e.preventDefault();;
//             } else {
//                 return true;
//             }
//         },
//         isEmail(e) {
//             return String(e)
//                 .toLowerCase()
//                 .match(
//                     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//                 )
//         },
//     }
// };
</script>