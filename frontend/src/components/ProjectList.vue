<template>
  <div class="project-list">
      <div class="grid grid-cols-2"></div>
      <div v-for="item in state.projects" :key="item._id">
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
    const {state, getAllprojects} = projectcrud()

    onMounted(()=> {
        getAllprojects()
    })
    return {state }

    }
}
</script>

<style>

</style>