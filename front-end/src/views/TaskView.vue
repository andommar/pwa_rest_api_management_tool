<template>
<div>
    <Header/>
    <div class="row">
        <SideBar/>
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div class="row">
            <div class="row gx-1">
                <!-- Task info -->
                <div class="col-md-7 border border-left-0 border-light rounded bg-white">
                    <div class="col mx-2 my-3">
                        <h1>{{task.title}}</h1>
                    </div>
                    <!-- Buttons -->
                    <div class="d-flex m-2">
                        <button class="nav-button rounded mx-1" @action="$router.push('/newproject')"><i class="bi bi-pencil"></i> Edit</button>
                        <button class="nav-button rounded mx-1" @click="showAsigneeModal = true"><i class="bi bi-person"></i> Assign</button>
                        <button class="nav-button rounded mx-1">Close issue</button>
                        <button class="nav-button rounded mx-1">Stop issue</button>
                        <div class="dropdown mx-1">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                Actions
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <button class="dropdown-item" @click="updateStatus('Backlog')" type="button">Backlog</button>
                                <button class="dropdown-item" @click="updateStatus('To Do')" type="button">To Do</button>
                                <button class="dropdown-item" @click="updateStatus('In progress')" type="button">In progress</button>
                                <button class="dropdown-item" @click="updateStatus('Done')" type="button">Done</button>
                            </div>
                        </div>
                    </div>

                    <!-- Assign user to task -->
                        <Teleport to="body">
                            <!-- use the modal component, pass in the prop -->
                            <FormPopUP :show="showAsigneeModal">
                                <template #header>
                                    <h3>Asign member</h3>
                                </template>

                                <template #body>
                                    <label for="Asignee">Asignee</label>
                                    <InputDropdownList v-model="inputMember" :memberList='project.projectMembers'/>

                                </template>

                                <template #footer>
                                    <button class="btn btn-success" @click=acceptNewAsignee>Accept</button>
                                    <button class="btn btn-danger"  @click="showAsigneeModal=false">Cancel</button>
                                </template>
                            </FormPopUP>
                        </Teleport>

                    <!-- Details section -->
                    <div class="mx-2 my-4">
                        <h4> Details</h4>
                        <div class="row">
                            <TaskViewRowInfo class='col-2' :params="'Priority:'" />
                            <TaskViewRowInfo class='col-3' :params="'High'" />
                            <TaskViewRowInfo class='col-2' :params="'Progress:'" />
                            <TaskViewRowInfo class='col-3' :params="task.taskKanbanStatus" />
                        </div>
                        <div class="row">
                            <TaskViewRowInfo class='col-2' :params="'Label:'" />
                            <TaskViewRowInfo class='col-3' :params="'Bug'" />
                            <TaskViewRowInfo class='col-2' :params="'Status:'" />
                            <TaskViewRowInfo class='col-3' :params="'Open'" />
                        </div>
                        <div class="row">
                            <TaskViewRowInfo class='col-2' :params="'Type:'" />
                            <TaskViewRowInfo class='col-3' :params="'Marketing and Sales'" />
                        </div>
                    </div>
                    <!-- Description section -->
                    <div class="col m-2">
                        <h5>Description</h5>
                    </div>
                    <div class="col mx-2">
                        <p>{{task.description}}</p>
                    </div>
                    <!--Log hours button and modal-->
                    <button id="show-modal" @click="showModal = true" class="btn btn-warning">Log hours</button>

                        <Teleport to="body">
                            <!-- use the modal component, pass in the prop -->
                            <FormPopUP :show="showModal">
                                <template #header>
                                    <h3>Log work</h3>
                                </template>

                                <template #body>
                                    <label for="logHours">Worked</label>
                                <input 
                                    type="number"
                                    class="form-control my-2"
                                    placeholder="Log hours"
                                    v-model.trim="input"
                                    >
                                    <div v-if="errorHours!=''" class="text-danger">{{ errorHours }}</div>
                                </template>

                                <template #footer>
                                    <button class="btn btn-success" @click=validateHours>Accept</button>
                                    <button class="btn btn-danger"  @click="showModal=false">Cancel</button>
                                </template>
                            </FormPopUP>
                        </Teleport>

                    <!-- Activity section -->
                    <div class="mx-2 my-4">
                        <div class="col">
                            <h5>Activity</h5>
                        </div>
                        <div class="row">
                            <div class="col-md-1">
                                <img src='../../public/images/avatars/dog-avatar.png' alt="asignee-avatar" class="img-fluid user-avatar">
                            </div>
                            <div class="col-md-9">
                                <div class="border rounded px-2">
                                    <p>Add a comment...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right card -->
                <div class="col-md-4 border border-left-0 border-light rounded offset-1 mx-2 bg-white">
                    <!-- Task timing -->
                    <div class="my-4 mx-2">
                        <div class="col my-2">
                            <h5>Dates</h5>
                        </div>
                        <div class="row">
                            <TaskViewRowInfo class='col-3' :params="'Created:'" />
                            <TaskViewRowInfo class='col-5' :params="formatDate(task.taskStartDate)" />
                        </div>
                        <div class="row">
                            <TaskViewRowInfo class='col-3' :params="'Start date:'" />
                            <TaskViewRowInfo class='col-5' :params="formatDate(task.taskStartDate)" />

                        </div>
                        <div class="row">
                            <TaskViewRowInfo class='col-3' :params="'End date:'" />
                            <TaskViewRowInfo class='col-5' :params="formatDate(task.taskEndDate)" />
                        </div>

                    </div>
                    <!-- Users section -->
                    <div class="my-4">
                        <div class="col mx-2 my-2">
                            <h5>People</h5>
                        </div>
                            <TaskUserSection :params="task.taskReporter" v-if="task.taskReporter" label='Reporter:'/>
                            <TaskUserSection :params="task.taskAsignee" v-if="task.taskAsignee" label='Asignee:'/>
                    </div>


                    <!-- Time tracking section -->
                    <div class="my-4">
                        <div class="col mx-2 my-2">
                            <h5>Time tracking</h5>
                        </div>
                        <div class="col mx-2 d-flex flex-column my-1">
                            <TimeProgressBar title='Estimated' class='bg-info' :hours="{totalHours:task.hoursAllocated, hoursValue:task.hoursAllocated}"/>
                            <TimeProgressBar title='Remaining' class='bg-warning' :reverse=true :hours="{totalHours:task.hoursAllocated, hoursValue:task.hoursRemainig}"/>
                            <TimeProgressBar title='Logged' class='bg-success' :hours="{totalHours:task.hoursAllocated, hoursValue:task.hoursLogged}"/>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </main>
    </div>
</div>
</template>

<script>
import  { useRoute } from 'vue-router'
import Header from '../components/ui/Header.vue'
import SideBar from '../components/ui/SideBar.vue'
import TaskUserSection from '../components/Task/taskUserSection.vue'
import TimeProgressBar from '../components/Task/taskProgressBar.vue'
import FormPopUP from '../components/FormPopUp.vue'
import TaskViewRowInfo from '../components/Task/taskViewRowInfo.vue'
import InputDropdownList from '../components/input/InputDropdownList.vue'
import {useStore} from 'vuex'
import { computed, onMounted } from '@vue/runtime-core'
import { ref } from 'vue'
import moment from 'moment'


export default {
    components:{
        Header,
        SideBar,
        TaskUserSection,
        TimeProgressBar,
        FormPopUP,
        TaskViewRowInfo,
        InputDropdownList
    },
    created: function () {
      this.moment = moment;
    },
    setup(){
        const showModal = ref(false)
        const showAsigneeModal = ref(false)
        const route = useRoute()
        const store = useStore()
        const taskId = route.params.id
        const input = ref('')
        const inputMember = ref('')
        const errorHours = ref('')
        

        const formatDate = (date) => {
          return moment(date).format("DD ddd/MMM/YYYY")
        }

        const validateHours = () => {
            if(input.value > task.value.hoursAllocated || input.value<0)
                errorHours.value = 'You cannot log in more hours than those assigned!'
            else{
                errorHours.value=''
                AcceptLogHours()
            }
        }
        const AcceptLogHours = async () => {
            showModal.value = false
            const remainingHours = task.value.hoursAllocated - input.value
            const params = {id: taskId, hoursLogged: input.value, hoursRemaining: remainingHours}
            await store.dispatch('updateTaskHours', params)
        }

        const acceptNewAsignee = async () => {
            showAsigneeModal.value = false
            console.log(input)
            if (inputMember.value == '')
                inputMember.value = null
            const params = {id: taskId, taskAsignee: inputMember.value}
            console.log(params)
            console.log(Object.keys(params), params)
            await store.dispatch('updateTaskAsignee', params)
        }

        const task = computed (() => {
            console.log('computed',store.getters.getTask)
            return store.getters.getTask
        })

        const project = computed (()=>{
            return store.getters.getProject
        })

        const updateStatus = async (status) => {
            const params = {id: taskId, status: status}
            await store.dispatch('updateTaskStatus', params)
        }

        onMounted(async () =>{
            await store.dispatch('fetchTask', taskId)
            await store.dispatch('fetchProjectbyTask', taskId )

        })

        return {
            task,showModal,input, AcceptLogHours, formatDate, showAsigneeModal,
            acceptNewAsignee, project, updateStatus, inputMember, errorHours, validateHours
        }
    }

}
</script>

<style scoped>
.user-avatar{
    height: 36px;
    width: auto;
}
button.nav-button{
    background-color: rgb(226,232,240);
    color: black;
    border: 0px;
    padding: 5px 10px;
}
button.nav-button:hover{
    background-color:rgb(108,117,125);
    color: white;
}
</style>