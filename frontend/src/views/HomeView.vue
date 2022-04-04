<template>


      <main class="flex flex-col w-full bg-white overflow-x-hidden overflow-y-auto mb-14">
        <div class="flex justify-around">
          <!-- Input -->
          <!-- <input type="text" placeholder="Project" v-model="state.newProject">
          <br>
          <span>Test: {{ state.newProject }}</span>
          <button @click="newProject()">New project - static</button>  -->

          <ProjectList />
          <!-- <div v-for="project in state.projects" :key="project._id">
            <router-link :to="{name: 'project single', params: {id: project._id}}">
              <h4>
                {{ project.name }}
              </h4>
              <p>
                {{ project.description }}
              </p>-->
              <!-- <button @click="editProject(project._id)">Edit project - static</button> -->
            <!--</router-link>
              <button @click="deleteProject(project._id)">Delete project - static</button>

              <br>
              <br>
          </div> -->
        </div>
      </main>

</template>

<script>
// @ is an alias to /src
import SideBar from '../components/ui/SideBar/SideBar'
import Header from '../components/ui/Header/Header'
import Card from "../components/Card.vue"
import {onMounted} from 'vue'
import projectcrud from '../modules/projectcrud'
import ProjectList from '../components/ProjectList.vue'

export default {
  name: 'HomeView',
  components: {
    SideBar,
    Header,
    Card,
    ProjectList
  },


    setup() {

    const {state, getAllprojects, newProject, deleteProject, editProject} = projectcrud()

    onMounted(()=>{
      getAllprojects()
    })
    return { state, getAllprojects, newProject, deleteProject, editProject }
  }
}
</script>
