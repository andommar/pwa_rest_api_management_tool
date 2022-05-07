<template>
    <form @submit.prevent="newProject">

        <InputField 
            v-model="projectState.newProject.newName"
            label="Project name"
            type="text"
        />
        <InputField
            v-model="projectState.newProject.newDescription"
            label="Project description"
            type="text"
        />
        <InputField
            v-model="projectState.newProject.newTotalHours"
            label="Project total hours"
            type="number"
        />
        <InputDropdownForm 
            v-model="projectState.newProject.newProjectLeader"/>
        
        <Multiselect
              v-model="value"
                mode="tags"
                :close-on-select="false"
                :searchable="true"
                :create-option="true"
            :options="userState.valueUsers"
        />

        <div class="form-group">
            <div class="form-check">
            <input class="form-check-input" type="checkbox" id="gridCheck">
            <label class="form-check-label" for="gridCheck">
                Check me out
            </label>
            </div>
        </div>
        <button type="submit" class="btn btn-primary">Create new project</button>
        <button type="button" @click="showVariables" class="btn btn-primary">Show</button>
    </form>
</template>

<script>
import Multiselect from '@vueform/multiselect'
import projectcrud from '../modules/projectcrud'
import InputField from '../components/Form/InputField.vue'
import InputDropdownForm from '../components/Form/InputDropdownForm.vue'
import usercrud from '../modules/usercrud'
import { onMounted, ref } from '@vue/runtime-core'

export default {
    components: {InputField, InputDropdownForm, Multiselect},
    setup(){
        const value = ref([])

        // const options = userState.value.users
        const options2 = ref([    { value: 'batman', label: 'Batman' },
        { value: 'robin', label: 'Robin' },
        { value: 'joker', label: 'Joker' },])
        const {projectState, newProject, showVariables} = projectcrud()


        const {userState, getAllUsers} = usercrud()
        const options = ref([userState.value.valueUsers])
        console.log(options.value)
        onMounted(() => {
            getAllUsers();
        })




        return {projectState, newProject, showVariables, userState, value, options}
    }

}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>