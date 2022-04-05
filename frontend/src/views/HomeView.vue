<template>
   
      <div>
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Dashboard</h1>
        <div class="btn-toolbar mb-2 mb-md-0">
          <div class="btn-group me-2">
            <button type="button" class="btn btn-sm btn-outline-secondary">Share</button>
            <button type="button" class="btn btn-sm btn-outline-secondary">Export</button>
          </div>
          <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle">
            <span data-feather="calendar"></span>
            This week
          </button>
        </div>
      </div>
          <ProjectList />
      </div>

          <!-- Input -->
          <!-- <input type="text" placeholder="Project" v-model="state.newProject">
          <br>
          <span>Test: {{ state.newProject }}</span>
          <button @click="newProject()">New project - static</button>  -->

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
