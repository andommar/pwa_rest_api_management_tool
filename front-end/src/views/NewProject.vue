<template>
<div>
    <Header/>
    <div class="row">
        <SideBar/>
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div>
            <h2>New project</h2>
            <form @submit.prevent="processForm">
                <ProjectForm :project='project'/>
            </form>
        </div>
        </main>
    </div>
</div>
</template>

<script>
import Header from '../components/ui/Header.vue'
import SideBar from '../components/ui/SideBar.vue'
import ProjectForm from '../components/ProjectForm.vue'
import {useStore} from 'vuex'
export default {
    components:{
        Header, SideBar, ProjectForm
    },
    setup(){
        const store = useStore()
        const project = {
            name: '',
            description: '',
            template: '',
            projectTotalHoursAllocated: '',
            projectLeader: '',
            projectMembers: '',
            projectTasks: '',
            projectCreationDate: '',
            projectStartDate:'',
            projectEndDate:''
        }

        const processForm = () => {
            console.log(project)
            store.dispatch('newProject', project)
        }

        return {project, processForm}
    }

}
</script>

<style>

</style>