<template>
<div>
      <Header/>
      <div class="row">
        <SideBar/>
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <Suspense>
                <template #default>
                    <div class="m-3">
                            <div class="row d-flex justify-content-center">
                                <div class="col-md-7 bg-white border-left-yellow">
                                    <div class="row d-flex my-2">
                                        <div class="col-md-3 d-flex flex-column justify-content-center align-items-center">
                                            <ImgComponent :class="['bg-color', 'user-avatar-info']" :imageSrc="member.avatar"/>
                                        </div>
                                        <div class="col-md-7 d-flex flex-column justify-content-center">
                                            <div class="row">
                                                <h4>{{member.username}}</h4>
                                                <div class="col-md-3">
                                                    <div class="font-bold">Name: </div>
                                                    <div class="font-bold">Surname: </div>
                                                    <div class="font-bold">Email: </div>
                                                    <div class="font-bold">Joined: </div>
                                                    <div class="font-bold">Active: </div>
                                                </div>
                                                <div class="col-md-7 ">
                                                    <div>{{member.name}} </div>
                                                    <div>{{member.surname}}</div>
                                                    <div>{{member.email}}</div>
                                                    <div>{{member.joined}}</div>
                                                    <div>{{member.active}}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="d-flex justify-content-end">
                                                <btnIcon class="btn btn-blue" text='Edit' @click="showModal = true" icon='pencil'/>
                                            </div>
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="row d-flex">
                                        <h5>Projects</h5>
                                        <div class="d-flex justify-content-between flex-wrap">
                                            <div class="project-card">
                                                hello
                                            </div>
                                            <div class="project-card">
                                                hello
                                            </div>
                                            <div class="project-card">
                                                hello
                                            </div>
                                            <div class="project-card">
                                                hello
                                            </div>
                                            <div class="project-card">
                                                hello
                                            </div>
                                            <div class="project-card">
                                                hello
                                            </div>
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="row d-flex">
                                        <h5>Tasks</h5>
                                        <div class="d-flex justify-content-between flex-wrap">
                                            <div class="project-card">
                                                hello
                                            </div>
                                            <div class="project-card">
                                                hello
                                            </div>
                                            <div class="project-card">
                                                hello
                                            </div>
                                            <div class="project-card">
                                                hello
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                                <!-- Pop up form -->
                        <Teleport to="body">
                            <!-- use the modal component, pass in the prop -->
                            <PopUp :show="showModal">
                                <template #header>
                                    <h3>Edit user</h3>
                                </template>
                                <template #body>
                                    <label for="Name">Name</label>
                                <input 
                                    type="text"
                                    class="form-control my-2"
                                    :placeholder="member.name"
                                    v-model.trim="input.name"
                                    >
                                    <label for="Surname">Surname</label>
                                <input 
                                    type="text"
                                    class="form-control my-2"
                                    :placeholder="member.surname"
                                    v-model.trim="input.surname"
                                    >
                                    <label for="Email">Email</label>
                                <input 
                                    type="email"
                                    class="form-control my-2"
                                    :placeholder="member.email"
                                    v-model.trim="input.email"
                                    >
                                    <div v-if="errorDisplay.name!=''" class="text-danger">{{ errors.name }}</div>
                                    <div v-if="errorDisplay.surname!=''" class="text-danger">{{ errors.surname }}</div>
                                    <div v-if="errorDisplay.email!=''" class="text-danger">{{ errors.email }}</div>
                                </template>
                                <template #footer>
                                    <button class="btn btn-success" @click=validateFields>Accept</button>
                                    <button class="btn btn-danger"  @click="showModal=false">Cancel</button>
                                </template>


                            </PopUp>
                        </Teleport>
                    </div>
                </template>
                <template #fallback>
                    Loading info...
                </template>
            </Suspense>
        </main>
      </div>
</div>

</template>

<script>
import Header from '../components/ui/Header.vue'
import SideBar from '../components/ui/SideBar.vue'
import ImgComponent from '../components/ui/imgComponent.vue'
import PopUp from '../components/FormPopUp.vue'
import {useStore} from 'vuex'
import btnIcon from '../components/input/btnIcon.vue'
import { useRoute } from 'vue-router'
import { computed,onMounted } from '@vue/runtime-core'
import { ref } from 'vue'


export default {
    components: {
        Header,
        SideBar,
        btnIcon,
        ImgComponent,
        PopUp
    },
    setup(){
        const showModal = ref(false)
        const route = useRoute()
        const id = route.params.id
        const store = useStore()
        const input = ref({name: '', surname:'', email:'', id: id})
        const errors = ref({name: '', surname:'', email:''})


        const member = computed (()=> {
            return store.getters.getMember
        })

        const errorDisplay = computed (()=> {
            return errors
        })

        const validateFields = () => {
            if(input.value.name == '')
                errors.value.name='Name required'
            else
                errors.value.name=''

            if(input.value.surname == '')
                errors.value.surname='Surname required'
            else
                errors.value.surname=''

            if(input.value.email == '')
                errors.value.email='Email required'
            else
                errors.value.email= ''
            
            if(errors.value.name == '' && errors.value.surname == '' && errors.value.email == '')
                SubmitEditUser()
        }

        const SubmitEditUser = async() => {
            showModal.value = false
            console.log(input)
            await store.dispatch('updateMember', input.value)
        }

        onMounted(async ()=>{
            await store.dispatch('fetchMember', id)
        })

        return {id, member,showModal, input, SubmitEditUser, errors, validateFields, errorDisplay}
    }
}
</script>

<style scoped>
.project-card{
    height: 120px;
    width: 120px;
    background-color: aqua;
    margin: 5px 5px;
}
.font-bold{
    font-weight: 600;
}
</style>