<template>

    <input 
        type="text"
        class="form-control my-2"
        placeholder="Insert name"
        v-model.trim="project.name"
        >
    <input 
        type="text"
        class="form-control my-2"
        placeholder="Insert description"
        v-model.trim="project.description"
        >
    <input 
        type="number"
        class="form-control my-2"
        placeholder="Project total hours name"
        v-model.trim="project.totalhours"
        >
    <input 
        type="date"
        class="form-control my-2"
        placeholder="Project start date"
        v-model.trim="project.projectStartDate"
        >
    <input 
        type="date"
        class="form-control my-2"
        placeholder="Project end date"
        v-model.trim="project.projectEndDate"
        >
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

        <button type="submit" class="btn btn-primary">Create new project</button>
</template>

<script>
export default {
    props:['project']
}
</script>

<style>

</style>