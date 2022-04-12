<template>
    <form @submit.prevent="newProject">
        <h4>Create new project</h4>
        <div class="field">
            <h6>Name</h6>
            <input type="text" v-model="state.newName">
        </div>
        <div class="field">
            <h6>Description</h6>
            <input type="text" v-model="state.newDescription">
        </div>
        <div class="submit">
            <button>Create new project</button>
        </div>
    </form>
</template>

<script>
import projectcrud from '../modules/projectcrud'
export default {
    setup(){
        const {state,newProject} = projectcrud()
        return {state,newProject}
    }

}
</script>

<style>

</style>