import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';

const getProjects = () => {

    const route = useRoute();
    const router = useRouter();

    const projectId = computed(()=> route.params.id)


    const projectState = ref({
        // newName:'',
        // newDescription: '',
        newProject: {newName:'', newDescription:'', newTotalHours:'', newProjectLeader:''},
        projects: {},
        tasks: {}
    })


    const getAllprojects = async () => {
        try {
            await fetch("http://localhost:3000/projects")
            .then(res => res.json())
            .then(data =>{
                projectState.value.projects = data
            })
        }
        catch(error) {
            console.log(error)
        }
    }

    const showVariables = () =>{
        console.log(projectState.value.newProject)
        console.log(projectState.value.newProject.newProjectLeader)
    }
    const newProject = () => {
        const requestOptions = {
            method: "POST",
            headers: {
                //if we dont put this in sometimes it might not accept the data
                "Content-Type": "application/json"
                //"auth-token": state.token --use tokens
            },
            body: JSON.stringify({ //stringify gets the data and converts it into json instance
                name: projectState.value.newProject.newName,
                description: projectState.value.newProject.newDescription,
                projectTotalHoursAllocated: projectState.value.newProject.newTotalHours,
                projectLeader: projectState.value.newProject.newProjectLeader
            })
        }
        fetch("http://localhost:3000/projects/new", requestOptions)

    }
    const deleteProject = (_id) =>{
        fetch("http://localhost:3000/projects/delete/" + _id, { method: "DELETE" })
        .then(getAllprojects())
    }
    const editProject = () => {
        const requestOptions = {
            method: "PUT",
            headers: {
                //if we dont put this in sometimes it might not accept the data
                "Content-Type": "application/json"
                //"auth-token": state.token --use tokens
            },
            body: JSON.stringify({ //stringify gets the data and converts it into json instance
                name: projectState.value.newProject,
                // todo: state.value.newTodoItem
            })
        }
        fetch("http://localhost:3000/projects/update/" + projectId.value, requestOptions)
        .then(res => res.body)
        .then(res => {console.log(res)})
        router.push('/') //sends to the todos page
    }

    const project = ref({})
    const GetSpecificProject = async() =>{
        try {
            fetch("http://localhost:3000/projects/")
            .then(res => res.json())
            .then(data => {
               project.value = data.filter( project => project._id === projectId.value) //value because we work with refs
            })
        }
        catch (error) {
            console.log(error)
        }
    }

    //fetch tasks from a project and delete the project id that moongoose returns
    const getProjectTasks = async() =>{
        try {
            fetch("http://localhost:3000/projects/get/"+projectId.value+"/tasks")
            .then(res => res.json())
            .then(data => {
               projectState.value.tasks = data.projectTasks
               delete projectState.value.tasks._id
            })
        }
        catch (error) {
            console.log(error)
        }
    }


    return {
        projectState,
        project,
        projectId,
        GetSpecificProject,
        getAllprojects,
        newProject,
        deleteProject,
        editProject,
        getProjectTasks,
        showVariables
    }
}

export default getProjects