<template>
  <div>
      <h1>Editing a Project</h1>
      <div v-for="item in project" :key="item._id">
        Name:<h4>{{ item.name }}</h4>
        Template project:<p>{{ item.template }}</p>
      </div>
      <hr>
      <input type="text" placeholder="Project" v-model="state.newProject">
      <br>
      <span>Test: {{ state.newProject }}</span>
      <hr>

      <button @click="editProject()">Update Project</button>
  </div>
</template>

<script>
import projectcrud from '../modules/projectcrud'

export default {
  setup() {
    const {state, editProject, project, projectId, GetSpecificProject} = projectcrud()

    GetSpecificProject()

    return {state, editProject, project, projectId, GetSpecificProject}
  }
}
</script>

<style>

</style>