<template>
<!-- component -->
  <div class="row">
    <div class="col-md-3 p-2">
      <div class="work-column bg-light border rounded">
        <div class="col-md-12 d-flex justify-content-center p-2">
          <h4>Backlog</h4>
        </div>
        <div v-for="task in state.tasks" :key="task._id">
          <div class="task-card border rounded p-2 m-2 bg-white">
            <div class="col-md-12">
              <h6>{{ task.title }}</h6>
            </div>
            <div class="row">
              <div class="col-md-12">
                <p>{{ task.description }}</p>
              </div>
            </div>
            <!-- Progress bar -->
            <div class="row">
              <div class="col-md-12 my-2">
                <div class="progress">
                  <div class="progress-bar" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
                </div>
              </div>
            </div>
            <!-- Icons  -->
            <div class="row my-2">
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
    </div>
    <div class="col-md-3 p-2">
      <div class="work-column bg-light border rounded">
        <div class="col-md-12 d-flex justify-content-center p-2">
          <h4>To do</h4>
        </div>
        <div v-for="task in state.tasks" :key="task._id">
          <div class="task-card border rounded p-2 m-2 bg-white">
            <div class="col-md-12">
              <h6>{{ task.title }}</h6>
            </div>
            <div class="row">
              <div class="col-md-12">
                <p>{{ task.description }}</p>
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

  </div>

</template>

<script>
import { onMounted } from '@vue/runtime-core'
import projectcrud from '../modules/projectcrud'
import { useRoute, useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    const id = route.params.id
    const {state, getProjectTasks} = projectcrud()

  onMounted(()=> {
        getProjectTasks()
    })
    return {state}
  }
}
</script>

<style>

</style>