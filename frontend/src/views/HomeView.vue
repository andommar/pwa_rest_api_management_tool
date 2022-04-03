<template>

<div class="flex h-screen">
  <div class="flex-1 flex flex-col overflow-hidden">
    <Header />
    <div class="flex h-full">
      <SideBar />
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
        <!-- <div class="flex w-full mx-auto px-6 py-8">
          <div class="flex flex-col w-full h-full text-gray-900 text-xl border-4 border-gray-900 border-dashed">
            <div class="flex w-full max-w-xl h-60 items-center justify-center mx-auto bg-green-400 border-b border-gray-600">Post</div>
            <div class="flex w-full max-w-xl h-60 items-center justify-center mx-auto bg-green-400 border-b border-gray-600">Post</div>
            <div class="flex w-full max-w-xl h-60 items-center justify-center mx-auto bg-green-400 border-b border-gray-600">Post</div>
            <div class="flex w-full max-w-xl h-60 items-center justify-center mx-auto bg-green-400 border-b border-gray-600">Post</div>
            <div class="flex w-full max-w-xl h-60 items-center justify-center mx-auto bg-green-400 border-b border-gray-600">Post</div>
          </div>
        </div> -->
      </main>
    </div>
  </div>
</div>
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
