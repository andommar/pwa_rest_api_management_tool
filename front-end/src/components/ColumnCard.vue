<template>
    <div class="col-md-3 p-2">
      <div class="work-column bg-light border rounded">
        <div class="col-md-12 d-flex flex-column justify-content-center p-2">
          <h4>{{ columnStatus }}</h4>
          <div v-for="task in tasks" :key="task._id">
            <TaskCard :task='task'/>
          </div>
          <router-link :to="{name: 'newtask', params:{status: columnStatus, project: project._id, tasksArr: JSON.stringify(tasks)}}">
            <button class="btn btn-secondary btn-sm">New task</button>
          </router-link>
          {{ project._id }}
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
        console.log(project.value['_id'])
      })


      return {project}
    }
}
</script>

<style>

</style>

