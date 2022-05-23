<template>
<div>
    <Header/>
    <div class="row">
        <SideBar/>
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <h1>{{project.name}}</h1>
            <div class="row my-2">
              <div class="col-md-8 d-flex justify-content-start align-items-center">
                <h3>Members: </h3>
                <div class="member-icons d-flex align-items-center">
                  <span data-title="Smiley face" v-for="member in projectMembers" :key="member._id">
                      <img class="member-avatar" :src=member.avatar data-title="Smiley face">
                  </span>
                </div>
              </div>
              <div class="col-md-4 d-flex justify-content-end">
                <btnIcon class="btn btn-info text-white mx-4" text='Edit project' icon='pencil' @click="showEditProjectModal = true"/>
                <btnIcon class="btn btn-info text-white mx-4" text='Add members' icon='plus' @action="showAddMemberModal = true"/>
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
            <!-- Add member modal -->
            <Teleport to="body">
                <!-- use the modal component, pass in the prop -->
                <FormPopUP :show="showAddMemberModal">
                    <template #header>
                        <h3>Add member</h3>
                    </template>

                    <template #body>
                        <label for="Name">Name</label>
                        <Multiselect
                                v-model="inputMembers"
                                mode="tags"
                                :searchable="true"
                                :multiple="true"
                                :taggable="true"
                                :options="optionsMultiselect"
                        />
                    </template>

                    <template #footer>
                        <button class="btn btn-success" @click=acceptAddMember>Accept</button>
                        <button class="btn btn-danger"  @click="showAddMemberModal=false">Cancel</button>
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
import Multiselect from '@vueform/multiselect'
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
      FormPopUP,
      Multiselect
  },
  setup() {
      const store = useStore()
      const inputMembers = ref([])
      const showAddMemberModal = ref(false)
      const tasks = ref([])
      const inputProject = ref([])
      const route = useRoute()
      const showEditProjectModal = ref(false)
      const projectId = route.params.id
      const optionsMultiselect = ref([])


      const filteredTasks = ref({Backlog: [], ToDo:[], InProgress:[], Done:[]})

      const project = computed (() => {
            return store.getters.getProject
      })

      const projectMembers = computed (()=>{
        return store.getters.getProject.projectMembers
      })
      
      const acceptEditProject = async () => {
        showEditProjectModal.value = false
        inputProject.value.filter(attribute=> attribute != '')
        const params = {id: projectId, updatedProject: inputProject.value}
        await store.dispatch('updateProject', params)
        inputProject.value = ''
      }

      const acceptAddMember = async ()=>{
        showAddMemberModal.value = false

        //Get the id of the members that are already in the project
        const projectMembersIdArr = projectMembers.value.map(member=> member._id)
        console.log (projectMembersIdArr)

        //Filters out the members selected members that are already in the project
        const filteredMembers = inputMembers.value.filter(newMember =>
         !projectMembersIdArr.includes(newMember))

        //merges two arrays. The old members with the new ones
        projectMembersIdArr.push(...filteredMembers)
        const params = {id: projectId, updatedProject: {projectMembers:projectMembersIdArr} }
        await store.dispatch('updateProject', params)
        inputMembers.value = []
      }





    onMounted(async ()=> {
        await store.dispatch('fetchProject', projectId)
        tasks.value = await store.getters.getProject.projectTasks
        filteredTasks.value.Backlog = tasks.value.filter(task=> task.taskKanbanStatus.includes('Backlog'))
        filteredTasks.value.ToDo = tasks.value.filter(task=> task.taskKanbanStatus.includes('To Do'))
        filteredTasks.value.InProgress = tasks.value.filter(task=> task.taskKanbanStatus.includes('In Progress'))
        filteredTasks.value.Done = tasks.value.filter(task=> task.taskKanbanStatus.includes('Done'))
        await store.dispatch('fetchMembers')

        const data = await store.getters.getMembers
        optionsMultiselect.value = data.map(member =>({"value": member._id, "label": member.name+ " " +member.surname}))
        console.log(optionsMultiselect)

    })


    return {
      tasks, project, filteredTasks, showEditProjectModal, showAddMemberModal,
      inputProject, acceptEditProject, projectMembers, inputMembers, optionsMultiselect,
      acceptAddMember
    }
  }
}
</script>

<style scoped>
@import "@vueform/multiselect/themes/default.css";
.member-avatar{
    height: 32px;
    width: auto;
    background-color: rgb(253,104,20);
    border-radius: 50%;
    margin: 0px 2px
}
.member-avatar:hover{
cursor: pointer;
}
</style>