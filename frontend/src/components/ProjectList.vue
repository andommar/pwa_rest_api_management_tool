<template>
  <div v-if="projects!=''" class="d-flex flex-wrap">
    <div v-for="project in projects" :key="project._id">
        <Project :project='project' />
    </div>
  </div>
  <div v-else class="d-flex flex-column flex-wrap align-items-center justify-content-center mt-4">
      <div class="emoji">🤷</div>
      <h2>You don't have any projects</h2>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import Project from '../components/Project.vue'
import { useStore } from 'vuex'
export default {
    props:['projects'],
    components: {
        Project
    },
    setup(props) {
        const store = useStore()
        console.log(props.projects)
        // const projects = computed(() => {
        //     return store.getters.getProjects
        // })

        onMounted(async ()=> {
            await store.dispatch('fetchProjects')
        })
        return {  }

    }
}
</script>

<style scoped>
.emoji{
    font-size: 220px
}
</style>