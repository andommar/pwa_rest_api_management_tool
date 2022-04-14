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
import projectcrud from '../modules/projectcrud'
import InputField from '../components/Form/InputField.vue'
import InputDropdownForm from '../components/Form/InputDropdownForm.vue'
export default {
    components: {InputField, InputDropdownForm},
    setup(){
        const {projectState, newProject, showVariables} = projectcrud()

        return {projectState, newProject, showVariables}
    }

}
</script>

<style>

</style>