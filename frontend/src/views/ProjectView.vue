<template>
<!-- component -->
  <div class="row">
    <div class="col-md-3 p-2">
      <div class="work-column bg-light border rounded">
        <div class="col-md-12 d-flex justify-content-center p-2">
          <h4>Backlog</h4>
        </div>
        <div class="task-card border rounded p-2 m-2 bg-white">
          <div class="col-md-12">
            <h6>Task 1</h6>
          </div>
          <div class="row">
            <div class="col-md-12">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, est.</p>
            </div>
          </div>
          <div class="d-flex justify-content-end">
            <div class="task-icon px-2">
              <a>
                <fa icon="user" size="xl" />
              </a>
            </div>
            <div class="task-icon px-2">
              <a>
                <fa icon="pen-to-square" size="lg" />
              </a>
            </div>
            <div class="task-icon px-2">
              <a>
                <fa icon="trash" size="lg" />
              </a>
            </div>
          </div>
          </div>
        </div>
      </div>
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