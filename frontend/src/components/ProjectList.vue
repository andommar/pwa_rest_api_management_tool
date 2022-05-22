<template>
  <div class="d-flex flex-wrap">
    <div v-for="project in projects" :key="project._id">
        <Project :project='project' />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import Project from '../components/Project.vue'
import { useStore } from 'vuex'
export default {
    components: {
        Project
    },
    setup() {
        const store = useStore()

        const projects = computed(() => {
            return store.getters.getProjects
        })

        onMounted(async ()=> {
            await store.dispatch('fetchProjects')
        })
        return { projects }

    }
}
</script>

<style>

</style>