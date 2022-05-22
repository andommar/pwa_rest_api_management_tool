<template>

    <label for="Project name">Task title</label>
    <input 
        type="text"
        class="form-control my-2"
        placeholder="Insert title"
        v-model.trim="task.title"
        >
    <label for="Project name">Description</label>
    <textarea 
        class="form-control my-2"
        placeholder="Insert description"
        v-model.trim="task.description"
        >
    </textarea>

    <label for="Project name">Kanban Status</label>
    <input disabled
        type="text"
        class="form-control my-2"
        placeholder="Insert Kanban status"
        v-model.trim="task.taskKanbanStatus"
        >

    <label for="Project name">Total hours</label>
    <input 
        type="number"
        class="form-control my-2"
        placeholder="task total hours name"
        v-model.trim="task.hoursAllocated"
        >

    <label for="Project name">Start date</label>
    <input 
        type="date"
        class="form-control my-2"
        placeholder="task start date"
        v-model.trim="task.taskStartDate"
        >

    <label for="Project name">End date date</label>
    <input 
        type="date"
        class="form-control my-2"
        placeholder="task end date"
        v-model.trim="task.taskEndDate"
        >

    <label for="Task reporter">Task reporter</label>
    <InputDropdownList v-model="task.taskReporter" :memberList='project.projectMembers'/>
    
    <label for="Task asignee">Task asignee</label>
    <InputDropdownList v-model="task.taskAsignee" :memberList='project.projectMembers'/>


        <button type="submit" class="btn btn-primary">Create new task</button>
</template>

<script>
import InputDropdownList from './input/InputDropdownList.vue'
import {useStore} from 'vuex'
import { onMounted } from '@vue/runtime-core'
import {ref} from 'vue'
export default {
    props:['task'],
    components: {InputDropdownList},
    setup(props) {
        const store = useStore()
        const project = ref([])

        onMounted(async ()=>{
            // await store.dispatch('fetchMembers')
            // members.value = await store.getters.getMembers
            await store.dispatch('fetchProject', props.task.projectId)
            project.value = await store.getters.getProject
        })

        return {project}
    }
}
</script>

<style scoped>
label{
    margin: 2px 0px 1px 5px
}

</style>