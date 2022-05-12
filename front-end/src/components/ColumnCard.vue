<template>
    <div class="col-md-3 p-2">
      <div class="work-column bg-light border rounded">
        <div class="col-md-12 d-flex flex-column justify-content-center p-2">
          <h4>{{ columnStatus }}</h4>
          <div v-for="task in tasks" :key="task._id">
            <TaskCard :task='task'/>
          </div>
          <router-link :to="{name: 'newtask', params:{status: columnStatus, projectId: projectId, tasksArr: JSON.stringify(tasks)}}">
            <button class="btn btn-secondary btn-sm">New task</button>
          </router-link>
        </div>
      </div>
    </div>
</template>

<script>
import { onMounted } from '@vue/runtime-core'
import {useStore} from 'vuex'
import TaskCard from './TaskCard.vue'
import {ref} from 'vue'
export default {
    props: ['columnStatus', 'tasks',],
    components: {
      TaskCard
    },
    setup(){
      const store = useStore()
      const project = ref({})
      onMounted(async ()=>{
        project.value = await store.getters.getProject
        console.log(project.value)
      })

      const projectId = project.value._id

      return {projectId}
    }
}
</script>

<style>

</style>

