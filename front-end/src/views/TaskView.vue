<template>
<div>
    <Header/>
    <div class="row">
        <SideBar/>
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div class="row">
            <div class="row gx-1">
                <!-- Task description -->
                <div class="col-md-7 border border-left-0 border-light rounded ">
                    <div class="col mx-2 my-3">
                        <h1>{{task.title}}</h1>
                    </div>
                    <!-- Buttons -->
                    <div class="d-flex m-2">
                        <button class="btn btn-light btn-sm rounded mx-1 btn-outline-secondary">Edit</button>
                        <button class="btn btn-light btn-sm rounded mx-1 btn-outline-secondary">Assign</button>
                        <button class="btn btn-light btn-sm rounded mx-1 btn-outline-secondary">Ressolve issue</button>
                        <button class="btn btn-light btn-sm rounded mx-1 btn-outline-secondary">Close issue</button>
                    </div>

                    <!-- Details section -->
                    <div class="mx-2 my-4">
                        <div class="col">
                            <h4> Details</h4>
                        </div>
                        <div class="row">
                            <div class="col-3">
                                <div>Priority:</div>
                            </div>
                            <div class="col-6">
                                High
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-3">
                                <div>Created:</div>
                            </div>
                            <div class="col-6">
                                05/Jun/2022 7:20pm
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-3">
                                <div>Labels:</div>
                            </div>
                            <div class="col-6">
                                Bug
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-3">
                                <div>Type:</div>
                            </div>
                            <div class="col-6">
                                Marketing and sales
                            </div>
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
                <div class="col-md-4 border border-left-0 border-light rounded offset-1 mx-2">
                    <!-- Task status -->
                    <div class="my-4">
                        <div class="col mx-2 my-2">
                            <h5>Status</h5>
                        </div>
                        <div class="col m-2 d-flex">
                            <div class="p-2">
                                <div class="bg-info p-2 text-white rounded">{{ task.taskKanbanStatus }}</div>
                            </div>
                            <div class="p-2">
                                <div class="dropdown">
                                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                            Actions
                                        </button>
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><a class="dropdown-item" href="#">Backlog</a></li>
                                    <li><a class="dropdown-item" href="#">To Do</a></li>
                                    <li><a class="dropdown-item" href="#">In progress</a></li>
                                    <li><a class="dropdown-item" href="#">Done</a></li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>

                    <!-- Users section -->
                    <TaskUserSection />

                    <!-- Time tracking section -->
                    <TaskTimeTracking />

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
import TaskTimeTracking from '../components/Task/taskTimeTracking.vue'
import {useStore} from 'vuex'
import { onMounted } from '@vue/runtime-core'
import { ref } from 'vue'
export default {
    components:{
        Header,
        SideBar,
        TaskUserSection,
        TaskTimeTracking
    },
    setup(){
        const route = useRoute()
        const store = useStore()
        const taskId = route.params.id
        const task = ref([])

        onMounted(async () =>{
            await store.dispatch('fetchTask', taskId)
            task.value = store.getters.getTask
            console.log(task.value)
        })

        return {task}
    }

}
</script>

<style>
.user-avatar{
    height: 36px;
    width: auto;
}
</style>