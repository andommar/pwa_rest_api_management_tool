<template>
<div>
    <Header/>
    <div class="row">
        <SideBar/>
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div class="m-3 d-flex justify-content-between">
            <h4>{{ project.name }}</h4>
            <btnIcon class="btn btn-info text-white mx-4" text='Add members' icon='plus' @action="$router.push('/newproject')"/>
          </div>

            <div class="row">
                    <ColumnCard columnStatus="Backlog" :tasks="filteredTasks.Backlog"/>
                    <ColumnCard columnStatus="To Do" :tasks="filteredTasks.ToDo"/>
                    <ColumnCard columnStatus="In Progress" :tasks="filteredTasks.InProgress"/>
                    <ColumnCard columnStatus="Done" :tasks="filteredTasks.Done"/>
            </div>
        </main>
    </div>
</div>

</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { ref } from 'vue'
import { useStore } from 'vuex'
import Header from '../components/ui/Header.vue'
import SideBar from '../components/ui/SideBar.vue'
import ColumnCard from '../components/ColumnCard.vue'
import TimeProgressBar from '../components/Task/taskProgressBar.vue'
import  { useRoute } from 'vue-router'
import btnIcon from '../components/input/btnIcon.vue'




export default {
  components: {
      SideBar,
      Header,
      ColumnCard,
      TimeProgressBar,
      btnIcon
  },
  setup() {
      const store = useStore()
      const tasks = ref([])
      const project = ref([])
      const route = useRoute()
      const projectId = route.params.id

      const filteredTasks = ref({Backlog: [], ToDo:[], InProgress:[], Done:[]})
      
    onMounted(async ()=> {
        await store.dispatch('fetchProject', projectId)
        project.value = await store.getters.getProject
        tasks.value = project.value.projectTasks
        filteredTasks.value.Backlog = tasks.value.filter(task=> task.taskKanbanStatus.includes('Backlog'))
        filteredTasks.value.ToDo = tasks.value.filter(task=> task.taskKanbanStatus.includes('To Do'))
        filteredTasks.value.InProgress = tasks.value.filter(task=> task.taskKanbanStatus.includes('In Progress'))
        filteredTasks.value.Done = tasks.value.filter(task=> task.taskKanbanStatus.includes('Done'))

    })


    return {tasks,project,filteredTasks}
  }
}
</script>

<style>

</style>