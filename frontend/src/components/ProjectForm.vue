<template>

    
    <label for="Project name">Project name</label>
    <input 
        type="text"
        class="form-control my-2"
        placeholder="Insert name"
        v-model.trim="project.name"
        >
    <label for="Project description">Description</label>
    <textarea 
        class="form-control my-2"
        placeholder="Insert description"
        v-model.trim="project.description"
        >
    </textarea>
    <label for="Project hours">Total hours</label>

    <input 
        type="number"
        class="form-control my-2"
        placeholder="Project total hours name"
        v-model.trim="project.totalhours"
        >
    <label for="Project start date">Start date</label>

    <input 
        type="date"
        class="form-control my-2"
        placeholder="Project start date"
        v-model.trim="project.projectStartDate"
        >
    <label for="Project end date">End date</label>

    <input 
        type="date"
        class="form-control my-2"
        placeholder="Project end date"
        v-model.trim="project.projectEndDate"
        >

    <label for="Project leader">Project leader</label>
    <InputDropdownList v-model="project.projectLeader" :memberList='members'/>

    <label for="Project members">Project members</label>
    <Multiselect
            v-model="project.projectMembers"
            mode="tags"
            :searchable="true"
            :multiple="true"
            :taggable="true"
            :options="optionsMultiselect"
    />

    <button type="submit" class="btn btn-primary">Create new project</button>

</template>

<script>
import Multiselect from '@vueform/multiselect'
import InputDropdownList from './input/InputDropdownList.vue'
import {useStore} from 'vuex'
import { onMounted } from '@vue/runtime-core'
import {ref} from 'vue'
export default {
    props:['project'],
    components: {
        InputDropdownList,
        Multiselect
    },
    setup(){
        const store = useStore()
        const members = ref([])
        const optionsMultiselect = ref([])

        onMounted(async ()=>{
            await store.dispatch('fetchMembers')
            const data = await store.getters.getMembers
            members.value = data
            optionsMultiselect.value = data.map(member =>  ({"value": member._id, "label": member.name+ " " +member.surname}))
            console.log(optionsMultiselect)
        })

        return {members, optionsMultiselect}
    }
}
</script>

<style src="@vueform/multiselect/themes/default.css">

</style>