<template>
<div>
    <Header/>
    <div class="row">
        <SideBar/>
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
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
import  { useRoute } from 'vue-router'
import Header from '../components/ui/Header.vue'
import SideBar from '../components/ui/SideBar.vue'
import ColumnCard from '../components/ColumnCard.vue'


export default {
  components: {
      SideBar,
      Header,
      ColumnCard
  },
  setup() {
      const store = useStore()
      const route = useRoute()
      const projectId = route.params.id
      const tasks = ref([])
      const filteredTasks = ref({Backlog: [], ToDo:[], InProgress:[], Done:[]})

      console.log('creation')
      
      store.dispatch('fetchProject', projectId)



    onMounted(async ()=> {
        await store.dispatch('fetchProjectTasks', projectId)
        tasks.value = await store.getters.getProjectTasks
        filteredTasks.value.Backlog = tasks.value.filter(task=> task.taskKanbanStatus.includes('Backlog'))
        filteredTasks.value.ToDo = tasks.value.filter(task=> task.taskKanbanStatus.includes('ToDo'))
        filteredTasks.value.InProgress = tasks.value.filter(task=> task.taskKanbanStatus.includes('InProgress'))
        filteredTasks.value.Done = tasks.value.filter(task=> task.taskKanbanStatus.includes('Done'))

        // await store.dispatch('filterTasks', 'Backlog')
    })


    return {tasks,filteredTasks}
  }
}
</script>

<style>

</style>