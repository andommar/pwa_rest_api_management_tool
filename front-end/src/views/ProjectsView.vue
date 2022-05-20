<template>
<div>
    <Header/>
      <div class="row">
        <SideBar/>
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div class="row">
                <h4>Projects</h4>
            </div>
            <div class="row m-4">
                <!-- <div v-if="errMsg"> {{error}}</div> -->
                <Suspense>
                    <template #default>
                    <table class="table table-responsive-xl bg-white rounded shadow-card">
                        <thead>
                            <tr>
                                <!-- <th>&nbsp;</th> -->
                                <th>Name</th>
                                <th>Project Leader</th>
                                <th>Creation date</th>
                                <th>Technologies</th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="project in projects" :key="project._id">
                                <!-- <td>
                                    <label class="checkbox-wrap checkbox-primary">
                                        <input type="checkbox" :value="project._id">
                                        <span class="checkmark"></span>
                                    </label>
                                </td> -->
                                <!-- <TableTdImg class="user-icon" :image="`https://anonymous-animals.azurewebsites.net/avatar/`+user.name"/> -->
                                <TableTdText :params="project.name"/>
                                <td>
                                  <img :src="getUserAvatar(project.projectLeader)" alt="">
                                  {{ getProjectLeader(project.projectLeader) }}
                                </td>
                                <TableTdText :params="formatDate(project.projectCreationDate)"/>
                                    <!-- <td v-if="task.taskAsignee">{{task.taskAsignee}}</td> -->
                                <!-- <TableTdText :params="task.taskAsignee"/> -->
                                <TableTdText :params="'NodeJs'"/>
                                <td>
                                    <div class="d-flex action-btns">
                                        <btnTableIcon class="btn btn-info text-white btn-sm mx-2" text='View' icon='kanban' @action="$router.push('/task/'+project._id)"/>
                                        <btnTableIcon class="btn btn-danger btn-sm mx-2" text='Delete' icon='trash' @action="deleteProject(project._id)"/>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </template>
                    <template #fallback>
                        Loading Table...
                    </template>
                </Suspense>
            </div>
        </main>
      </div>
</div>

</template>

<script>

import Header from '../components/ui/Header.vue'
import SideBar from '../components/ui/SideBar.vue'
import ViewTable from '../components/table/ViewTable.vue'
import TableTdText from '../components/table/TableTdText.vue'
import TableTdImg from '../components/table/TableTdImg.vue'
import btnTableIcon from '../components/input/btnIcon.vue'
import {useStore} from 'vuex'
import { computed, onMounted } from '@vue/runtime-core'
import moment from 'moment'

import {ref} from 'vue'
export default {
    components:{
        Header,
        SideBar,
        ViewTable,
        TableTdText,
        TableTdImg,
        btnTableIcon
    },
    created: function () {
      this.moment = moment;
    },
    setup(){
        const store = useStore()
        const defaultAvatar = 'https://anonymous-animals.azurewebsites.net/animal/Dinosaur'

        const projects = computed(()=>{
            return store.getters.getProjects
        })

        const formatDate = (date) => {
          return moment(date).format("ddd MMM DD, YYYY [at] HH:mm a")
        }

        const getUserAvatar = (person) => person == null ? defaultAvatar : person.avatar
        const getProjectLeader = (person) => person == null ? 'Nobody' : person.name+' '+ person.surname
        // const taskPerson = (member) => member == null ? 'Nobody' : member.name


        onMounted(async ()=>{
            await store.dispatch('fetchProjects')
        })

        const deleteProject = async (projectId) =>{
            await store.dispatch('deleteProject', projectId)
            await store.dispatch('fetchProjects')
        }

        return {projects, deleteProject,formatDate, getProjectLeader, getUserAvatar}
    }
}
</script>

<style scoped>

table{
    border-left: 6px rgb(240,181,45) solid;
}
img {
    height: 32px;
    width: auto;
    background-color: rgb(253,104,20);
    border-radius: 50%;
}

</style>