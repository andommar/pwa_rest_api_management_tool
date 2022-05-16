<template>
<div>
      <Header/>
      <div class="row">
        <SideBar/>
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div class="m-3">
            <h4>Projects</h4>
            <router-link to="/newproject">
              <button class="btn btn-info"><i class="bi bi-plus-lg mx-1"></i>New project</button>
            </router-link>
          </div>

          <!-- <Navigator/>   -->
          <ProjectList />
        </main>
      </div>
</div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'

import Header from '../components/ui/Header.vue'
import SideBar from '../components/ui/SideBar.vue'
import ProjectList from '../components/ProjectList.vue'
import {useStore} from 'vuex'
export default {
  name: 'HomeView',
  components: {
    Header, SideBar, ProjectList
  },
  setup(){
    const store = useStore()
    store.dispatch('loadLocalStorage')

  }
}
</script>

<style scoped>

</style>