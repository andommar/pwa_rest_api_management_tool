<template>
<div>
    <Header/>
    <div class="row">
        <SideBar/>
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div class="row d-flex justify-content-center ">
                <div class="col-md-6 form-card">
                    <div class="my-4">
                        <h2>New task</h2>
                        <form @submit.prevent="processForm">
                            <TaskForm :task='task'/>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    </div>
</div>
</template>

<script>
import Header from '../components/ui/Header.vue'
import SideBar from '../components/ui/SideBar.vue'
import TaskForm from '../components/TaskForm.vue'
import { useRoute, useRouter } from 'vue-router'
import {useStore} from 'vuex'


export default {
    components: {Header, SideBar, TaskForm},
    setup(){
        const route = useRoute()
        const store = useStore()
        const router = useRouter()


        //
        const columnStatus = route.params.status
        const projectId = route.params.project

        //We collect the tasks of the project and create a new array with only the ids of the tasks
        const tasksArr = JSON.parse(route.params.tasksArr)
        const tasksID = tasksArr.map((task => task._id))


        const task = {
            title: '',
            description: '',
            hoursAllocated: 0,
            taskKanbanStatus: columnStatus,
            is_closed: '',
            taskReporter: null,
            taskAsignee: null,
            projectId: projectId
        }

        //After the new task has been created. The id of the new task is retrieved and pushed into the array of the tasks
        //Then the project is updated with the added new task
        const processForm = async () => {
            console.log('Task button', task)
            await store.dispatch('newTask', task)
            const newTaskId = await store.getters.getTask._id
            await tasksID.push(newTaskId)
            const params = {tasksID: tasksID, id: projectId}
            await store.dispatch('updateProjectTask', params)
            router.push({ name: 'project', params: {id: projectId}})
        }

        return {task, processForm}

    }
}
</script>

<style>
.form-card{
    font-size: 1.2rem;
    border-left: 6px rgb(240,181,45) solid;
    background-color: white;
}
</style>