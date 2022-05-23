<template>
<div>
    <Header/>
    <div class="row">
        <SideBar/>
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div class="m-3 d-flex justify-content-between">
            <div class="col-md-4">
              <h4>{{project.name}}</h4>
            </div>
            <div class="col-md-8 d-flex justify-content-end">
              <btnIcon class="btn btn-info text-white mx-4" text='Edit project' icon='pencil' @click="showEditProjectModal = true"/>
              <btnIcon class="btn btn-info text-white mx-4" text='Add members' icon='plus' @action="$router.push('/newproject')"/>
            </div>
          </div>
            <div class="row">
                    <ColumnCard columnStatus="Backlog" :tasks="filteredTasks.Backlog"/>
                    <ColumnCard columnStatus="To Do" :tasks="filteredTasks.ToDo"/>
                    <ColumnCard columnStatus="In Progress" :tasks="filteredTasks.InProgress"/>
                    <ColumnCard columnStatus="Done" :tasks="filteredTasks.Done"/>
            </div>

            <!-- Edit project modal -->
            <Teleport to="body">
                <!-- use the modal component, pass in the prop -->
                <FormPopUP :show="showEditProjectModal">
                    <template #header>
                        <h3>Edit project</h3>
                    </template>

                    <template #body>
                        <label for="Title">Name</label>
                        <input 
                            type="text"
                            class="form-control my-2"
                            :placeholder="project.name"
                            v-model.trim="inputProject.name"
                            >
                        <label for="Title">Description</label>
                        <textarea 
                            class="form-control my-2"
                            :placeholder="project.description"
                            v-model.trim="inputProject.description"
                            >
                        </textarea>
                        <label for="Title">Start date</label>
                        <input 
                            type="date"
                            class="form-control my-2"
                            :placeholder="project.projectStartDate"
                            v-model.trim="inputProject.projectStartDate"
                            >
                        <label for="Title">End date</label>
                        <input 
                            type="date"
                            class="form-control my-2"
                            :placeholder="project.projectEndDate"
                            v-model.trim="inputProject.projectEndDate"
                            >
                    </template>

                    <template #footer>
                        <button class="btn btn-success" @click=acceptEditProject>Accept</button>
                        <button class="btn btn-danger"  @click="showEditProjectModal=false">Cancel</button>
                    </template>
                </FormPopUP>
            </Teleport>
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
import FormPopUP from '../components/FormPopUp.vue'





export default {
  components: {
      SideBar,
      Header,
      ColumnCard,
      TimeProgressBar,
      btnIcon,
      FormPopUP
  },
  setup() {
      const store = useStore()
      const tasks = ref([])
      const inputProject = ref([])
      const route = useRoute()
      const showEditProjectModal = ref(false)
      const projectId = route.params.id

      const filteredTasks = ref({Backlog: [], ToDo:[], InProgress:[], Done:[]})

      const project = computed (() => {
            return store.getters.getProject
      })
      
      console.log('computed', project)
      const acceptEditProject = async () => {
        showEditProjectModal.value = false
        inputProject.value.filter(attribute=> attribute != '')
        const params = {id: projectId, updatedProject: inputProject.value}
        await store.dispatch('updateProject', params)
        inputProject.value = ''
      }




    onMounted(async ()=> {
        await store.dispatch('fetchProject', projectId)
        tasks.value = await store.getters.getProject.projectTasks
        filteredTasks.value.Backlog = tasks.value.filter(task=> task.taskKanbanStatus.includes('Backlog'))
        filteredTasks.value.ToDo = tasks.value.filter(task=> task.taskKanbanStatus.includes('To Do'))
        filteredTasks.value.InProgress = tasks.value.filter(task=> task.taskKanbanStatus.includes('In Progress'))
        filteredTasks.value.Done = tasks.value.filter(task=> task.taskKanbanStatus.includes('Done'))

    })


    return {tasks, project, filteredTasks, showEditProjectModal, inputProject, acceptEditProject}
  }
}
</script>

<style>

</style>