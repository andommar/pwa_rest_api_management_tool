<template>
    <div class="col-md-3 p-2">
      <div class="work-column bg-light border rounded shadow-card ">
        <div class="col-md-12 d-flex flex-column align-items-center p-2">
          <h3>{{ columnStatus }}</h3>
          <div class="d-flex col-md-12" v-for="task in tasks" :key="task._id">
            <TaskCard :task='task'/>
          </div>
        </div>
            <div class="d-grid gap-2 m-2">
              <button class="btn btn-warning btn-sm" :disabled="!isUserProjectMember"
              @click="$router.push({name: 'newtask', params:{status: columnStatus, project: project._id, tasksArr: JSON.stringify(tasks)}})">
                <i class="bi bi-plus-circle"></i>
                New task
              </button>
            </div>
          <!-- {{ project._id }} -->
      </div>
    </div>
</template>

<script>
import { onMounted, computed } from '@vue/runtime-core'
import {useStore} from 'vuex'
import TaskCard from './TaskCard.vue'
import {ref} from 'vue'
import  { useRoute } from 'vue-router'

export default {
    props: ['columnStatus', 'tasks',],
    components: {
      TaskCard
    },
    setup(){
      const store = useStore()
      const project = ref({})
      const route = useRoute()
      const projectId = route.params.id
      const projectMembers = ref([])

      const isUserProjectMember = computed(()=>{
        const projectMembersId = projectMembers.value.map(member=>member._id)
        const userId = store.getters.getUserIdFromStorage

        return projectMembersId.includes(userId)
      })

      onMounted(async ()=>{
        await store.dispatch('fetchProject', projectId)
        project.value = await store.getters.getProject
        projectMembers.value = store.getters.getProjectMembers
      })


      return {project, isUserProjectMember}
    }
}
</script>

<style>

</style>

