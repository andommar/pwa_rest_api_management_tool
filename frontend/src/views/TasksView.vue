<template>
<div>
    <Header/>
      <div class="row">
        <SideBar/>
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div class="row m-4">
                <h4>Tasks</h4>
            </div>
            <div class="row m-4">
                <div class="mb-4">
                    <searchBar v-model="text" @action ="processSearch"/>
                </div>
                <Suspense>
                    <template #default>
                    <table class="table table-responsive-xl bg-white rounded shadow-card">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Kanban Status</th>
                                <th >Hours Allocated</th>
                                <th >Task reporter</th>
                                <th >Task asignee</th>
                                <th >Task start date</th>
                                <th >Tast end date</th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="task in tasks" :key="task._id">
                                <!-- <td>
                                    <label class="checkbox-wrap checkbox-primary">
                                        <input type="checkbox" :value="task._id">
                                        <span class="checkmark"></span>
                                    </label>
                                </td> -->
                                <!-- <TableTdImg class="user-icon" :image="`https://anonymous-animals.azurewebsites.net/avatar/`+user.name"/> -->
                                <TableTdText :params="task.title"/>
                                <TableTdText :params="task.taskKanbanStatus"/>
                                <TableTdText :params="task.hoursAllocated"/>
                                <TableTdText :params="taskPerson(task.taskReporter)"/>
                                <TableTdText :params="taskPerson(task.taskAsignee)"/>
                                <TableTdText :params="formatDate(task.taskStartDate)"/>
                                <TableTdText :params="formatDate(task.taskEndDate)"/>

                                <td>
                                    <div class="d-flex action-btns">
                                        <btnTableIcon class="btn btn-info text-white btn-sm mx-2" text='View' icon='clipboard' @action="$router.push('/task/'+task._id)"/>
                                        <template v-if="isAdmin">
                                            <btnTableIcon class="btn btn-danger btn-sm mx-2" text='Delete' icon='trash' @action="deleteTask(task._id)"/>
                                        </template>
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
import searchBar from '../components/input/searchBar.vue'
import {useStore} from 'vuex'
import { computed, onMounted } from '@vue/runtime-core'
import {ref} from 'vue'
import moment from 'moment'


export default {
    components:{
        Header,
        SideBar,
        ViewTable,
        TableTdText,
        TableTdImg,
        btnTableIcon,
        searchBar
    },
    created: function () {
      this.moment = moment;
    },
    setup(){
        const store = useStore()
        const isAdmin = ref(store.getters.isUserAdmin)
        const text = ref('')

        const formatDate = (date) => {
          return moment(date).format("DD MMM, YYYY")
        }

        const tasks = computed(()=>{
            return store.getters.getFilteredTask
        })

        const taskPerson = (member) => member == null ? 'Nobody' : member.name


        onMounted(async ()=>{
            await store.dispatch('fetchTasks')
            const userId = localStorage.getItem('user')
            store.dispatch('fetchUser', userId)
        })

        const deleteTask = async (memberId) =>{
            await store.dispatch('deleteTask', memberId)
            await store.dispatch('fetchTasks')
        }

        const processSearch = () =>{
            console.log(text.value)
            store.dispatch('filterTask', text.value)
        }

        return {tasks, processSearch, taskPerson, deleteTask, isAdmin, formatDate, text}
    }
}
</script>

<style scoped>
table{
    border-left: 6px rgb(240,181,45) solid;
}

</style>