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
                        <button class="nav-button rounded mx-1"><i class="bi bi-pencil"></i> Edit</button>
                        <button class="nav-button rounded mx-1"> <i class="bi bi-person"></i> Assign</button>
                        <button class="nav-button rounded mx-1">Close issue</button>
                        <button class="nav-button rounded mx-1">Stop issue</button>
                        <div class="dropdown mx-1">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                Actions
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <button class="dropdown-item" type="button">Backlog</button>
                                <button class="dropdown-item" type="button">To Do</button>
                                <button class="dropdown-item" type="button">In progress</button>
                                <button class="dropdown-item" type="button">Done</button>
                            </div>
                        </div>
                    </div>

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
                    <!-- Attachments section-->
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
                                </template>

                                <template #footer>
                                    <button class="btn btn-success" @click=AcceptLogHours>Accept</button>
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
                            <TaskViewRowInfo class='col-3' :params="'05/June/19'" />
                        </div>
                        <div class="row">
                            <TaskViewRowInfo class='col-3' :params="'Updated:'" />
                            <TaskViewRowInfo class='col-3' :params="'22/September/19'" />
                        </div>
                        <div class="row">
                            <TaskViewRowInfo class='col-3' :params="'Due to:'" />
                            <TaskViewRowInfo class='col-3' :params="'22/January/21'" />
                        </div>

                    </div>
                    <!-- Users section -->
                    <TaskUserSection />

                    <!-- Time tracking section -->
                    <div class="my-4">
                        <div class="col mx-2 my-2">
                            <h5>Time tracking</h5>
                        </div>
                        <div class="col mx-2 d-flex flex-column my-1">
                            <TimeProgressBar title='Estimated' class='bg-info' :hours="{totalHours:task.hoursAllocated, hoursValue:task.hoursAllocated}"/>
                            <TimeProgressBar title='Remaining' class='bg-warning' :hours="{totalHours:task.hoursAllocated, hoursValue:task.hoursRemainig}"/>
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
import {useStore} from 'vuex'
import { computed, onMounted } from '@vue/runtime-core'
import { ref } from 'vue'
import FormPopUP from '../components/FormPopUp.vue'
import TaskViewRowInfo from '../components/Task/taskViewRowInfo.vue'

export default {
    components:{
        Header,
        SideBar,
        TaskUserSection,
        TimeProgressBar,
        FormPopUP,
        TaskViewRowInfo
    },
    setup(){
        const showModal = ref(false)
        const route = useRoute()
        const store = useStore()
        const taskId = route.params.id
        // const task = ref([])
        const input = ref('')



        const AcceptLogHours = async () => {
            showModal.value = false
            console.log(input)
            const params = {id: taskId, hoursLogged: input.value}
            await store.dispatch('updateTask', params)
        }

        const task = computed (() => {
            console.log('computed',store.getters.getTask)
            return store.getters.getTask
        })




        onMounted(async () =>{
            await store.dispatch('fetchTask', taskId)
            // task.value = store.getters.getTask
            // console.log(task.value)
        })

        return {task,showModal,input,AcceptLogHours}
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