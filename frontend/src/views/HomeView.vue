<template>
<div>
      <Header/>
      <div class="row">
        <SideBar/>
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div class="m-3 d-flex justify-content-between">
            <h4>My projects</h4>
            <btnIcon class="btn btn-info text-white mx-4" text='New project' icon='plus' @action="$router.push('/newproject')"/>
          </div>
          

          <!-- <Navigator/>   -->
          <ProjectList :projects="userProjects"/>
        </main>
      </div>
</div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'

import Header from '../components/ui/Header.vue'
import SideBar from '../components/ui/SideBar.vue'
import ProjectList from '../components/ProjectList.vue'
import btnIcon from '../components/input/btnIcon.vue'
import {useStore} from 'vuex'
export default {
  name: 'HomeView',
  components: {
    Header, SideBar, ProjectList, btnIcon
  },
  setup(){
    const store = useStore()
    store.dispatch('loadLocalStorage')

    const userProjects = computed(()=>{
      return store.getters.getUserProjects
    })

    console.log(userProjects)

    onMounted(async()=>{
        const userId = localStorage.getItem('user')
        store.dispatch('fetchUser', userId)
    })

    return {userProjects}
  }
}
</script>

<style scoped>

</style>