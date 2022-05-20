<template>
<div>
    <Header/>
      <div class="row">
        <SideBar/>
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div class="row">
                <h4>Tasks</h4>
            </div>
            <div class="row m-4">
                <!-- <div v-if="errMsg"> {{error}}</div> -->
                <Suspense>
                    <template #default>
                    <table class="table table-responsive-xl bg-white rounded shadow-card">
                        <thead>
                            <tr>
                                <th>&nbsp;</th>
                                <th>Title</th>
                                <th>Kanban Status</th>
                                <th >Hours Allocated</th>
                                <th >Hours used</th>
                                <th >Task reporter</th>
                                <th >Task asignee</th>
                                <th >Creation date</th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="task in tasks" :key="task._id">
                                <td>
                                    <label class="checkbox-wrap checkbox-primary">
                                        <input type="checkbox" :value="task._id">
                                        <span class="checkmark"></span>
                                    </label>
                                </td>
                                <!-- <TableTdImg class="user-icon" :image="`https://anonymous-animals.azurewebsites.net/avatar/`+user.name"/> -->
                                <TableTdText :params="task.title"/>
                                <TableTdText :params="task.taskKanbanStatus"/>
                                <TableTdText :params="task.hoursAllocated"/>
                                <TableTdText :params="task.hoursLogged"/>
                                <TableTdText :params="taskPerson(task.taskReporter)"/>
                                <TableTdText :params="taskPerson(task.taskAsignee)"/>
                                    <!-- <td v-if="task.taskAsignee">{{task.taskAsignee}}</td> -->
                                <!-- <TableTdText :params="task.taskAsignee"/> -->
                                <td class="status"><span class="active">24/June/2011</span></td>
                                <td>
                                    <div class="d-flex action-btns">
                                        <btnTableIcon class="btn btn-info text-white btn-sm mx-2" text='View' icon='clipboard' @action="$router.push('/task/'+task._id)"/>
                                        <btnTableIcon class="btn btn-danger btn-sm mx-2" text='Delete' icon='trash' @action="deleteTask(task._id)"/>
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
    setup(){
        const store = useStore()


        const tasks = computed(()=>{
            return store.getters.getTasks
        })

        const taskPerson = (member) => member == null ? 'Nobody' : member.name


        onMounted(async ()=>{
            await store.dispatch('fetchTasks')
        })

        const deleteTask = async (memberId) =>{
            await store.dispatch('deleteTask', memberId)
            await store.dispatch('fetchTasks')
        }

        return {tasks, taskPerson, deleteTask}
    }
}
</script>

<style scoped>



</style>