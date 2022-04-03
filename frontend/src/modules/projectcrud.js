import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';

const getProjects = () => {

    const route = useRoute();
    const router = useRouter();

    const projectId = computed(()=> route.params.id)


    const state = ref({
        newProject:'',
        projects: {}
    })


    const getAllprojects = async () => {
        try {
            await fetch("http://localhost:3000/projects")
            .then(res => res.json())
            .then(data =>{
                state.value.projects = data
            })
        }
        catch(error) {
            console.log(error)
        }
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
                name: state.value.newProject
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
                name: state.value.newProject,
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


    return {
        state,
        project,
        projectId,
        GetSpecificProject,
        getAllprojects,
        newProject,
        deleteProject,
        editProject
    }
}

export default getProjects