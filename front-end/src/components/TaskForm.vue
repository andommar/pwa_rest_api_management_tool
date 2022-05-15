<template>

    <input 
        type="text"
        class="form-control my-2"
        placeholder="Insert title"
        v-model.trim="task.title"
        >
    <input 
        type="text"
        class="form-control my-2"
        placeholder="Insert description"
        v-model.trim="task.description"
        >
    <input 
        type="text"
        class="form-control my-2"
        placeholder="Insert Kanban status"
        v-model.trim="task.taskKanbanStatus"
        >
    <input 
        type="number"
        class="form-control my-2"
        placeholder="task total hours name"
        v-model.trim="task.hoursAllocated"
        >
    <input 
        type="date"
        class="form-control my-2"
        placeholder="task start date"
        v-model.trim="task.taskStartDate"
        >
    <input 
        type="date"
        class="form-control my-2"
        placeholder="task end date"
        v-model.trim="task.taskEndDate"
        >

    <InputDropdownList v-model="task.taskReporter" label='Task Reporter' :memberList='members'/>
    <InputDropdownList v-model="task.taskAsignee" label='Task Asignee' :memberList='members'/>
        <!-- <InputDropdownForm 
            v-model="projectState.newProject.newProjectLeader"/>
        
        <Multiselect
              v-model="value"
                mode="tags"
                :close-on-select="false"
                :searchable="true"
                :create-option="true"
            :options="userState.valueUsers"
        /> -->

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
    setup() {
        const store = useStore()
        const members = ref([])

        onMounted(async ()=>{
            await store.dispatch('fetchMembers')
            members.value = await store.getters.getMembers
        })

        return {members}
    }
}
</script>

<style>

</style>