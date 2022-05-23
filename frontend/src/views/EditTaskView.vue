<template>
<div>
    <Header/>
    <div class="row">
        <SideBar/>
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div class="row d-flex justify-content-center ">
            <div class="col-md-6 form-card">
                <div class="my-4">
                    <h2>New project</h2>
                    <form @submit.prevent="processForm">
                        <TaskForm :project='project'/>
                    </form>
                </div>
            </div>
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
import { onMounted } from '@vue/runtime-core'
import {useRoute} from 'vue-router'
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
            projectMembers: [],
            projectTasks: '',
            projectCreationDate: '',
            projectStartDate:'',
            projectEndDate:''
        }

        //We fetch from the store the new project that has been created
        //and also the members that have been asigned to the new project
        //we call a function to assign the project
        const processForm = async () => {
            // console.log(project)
            await store.dispatch('newProject', project)
            const projectDB = await store.getters.getProject
            const newProjectId = projectDB._id
            const projectMembers = projectDB.projectMembers

            assignProject(projectMembers, newProjectId)
        }

        //for each member that has been assigned to the the new project
        // we fetch the projects that they're already working in
        //and we push the new project into the array
        //then we call the update endpoint to update the list of projects that
        //each member (user) are in
        const assignProject = (members, projectId) => {
            members.forEach((member)=>{
                let memberProjects = member.projectsAssigned
                memberProjects.push(projectId)
                const params = {projectsAssigned: memberProjects, id: member._id }
                store.dispatch('updateProjectMember', params)
            })
        }

        onMounted(()=>{

        })


        return {project, processForm}
    }

}
</script>

<style>
.form-card{
    font-size: 1.2rem;
    border-left: 6px rgb(240,181,45) solid;
    background-color: white;
}
</style>