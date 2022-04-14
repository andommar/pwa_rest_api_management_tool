<template>
  <div class="project-list">
    <router-link :to="{name: 'new project'}">
        <button class="btn btn-light rounded mx-1 btn-outline-secondary">New project</button>
    </router-link>
    <div v-for="item in projectState.projects" :key="item._id">
        <SingleProject :project='item' />
    </div>
  </div>
</template>

<script>
import { onMounted } from '@vue/runtime-core'
import projectcrud from '../modules/projectcrud'
import SingleProject from '../components/SingleProject.vue'
export default {
    components: {
        SingleProject
    },
    setup() {
    const {projectState, getAllprojects} = projectcrud()

    onMounted(()=> {
        getAllprojects()
    })
    return {projectState }

    }
}
</script>

<style>

</style>