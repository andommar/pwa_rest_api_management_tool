<template>
<div>
    <Header/>
    <div class="row">
        <SideBar/>
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div>
                <h2>New task</h2>
                <form @submit.prevent="processForm">
                    <TaskForm :task='task'/>
                </form>
            </div>
        </main>
    </div>
</div>
</template>

<script>
import Header from '../components/ui/Header.vue'
import SideBar from '../components/ui/SideBar.vue'
import TaskForm from '../components/TaskForm.vue'
import { useRoute } from 'vue-router'
import {useStore} from 'vuex'

export default {
    components: {Header, SideBar, TaskForm},
    setup(){
        const route = useRoute()
        const columnStatus = route.params.status
        const projectId = route.params.projectId
        const tasksArr = JSON.parse(route.params.tasksArr)
        const store = useStore()

        console.log(tasksArr)
        const task = {
            title: '',
            description: '',
            hoursAllocated: '',
            taskKanbanStatus: columnStatus,
            is_closed: '',
            taskReporter: '',
            taskAsignee: '',
        }

        const processForm = async () => {
            await store.dispatch('newTask', task)
            tasksArr.push(task)
            console.log('Pushed array',tasksArr)
            await store.dispatch('updateProjectTask', tasksArr, projectId)
        }

        return {task, processForm}

    }
}
</script>

<style>

</style>