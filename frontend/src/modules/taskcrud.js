import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';

const getTasks = () => {

    const route = useRoute();
    const router = useRouter();

    const taskId = computed(()=> route.params.taskid)


    const state = ref({
        newTask:'',
        tasks: {}
    })


    const getAllTasks = async () => {
        try {
            await fetch("http://localhost:3000/tasks")
            .then(res => res.json())
            .then(data =>{
                state.value.tasks = data
            })
        }
        catch(error) {
            console.log(error)
        }
    }

    const newTask = () => {
        const requestOptions = {
            method: "POST",
            headers: {
                //if we dont put this in sometimes it might not accept the data
                "Content-Type": "application/json"
                //"auth-token": state.token --use tokens
            },
            body: JSON.stringify({ //stringify gets the data and converts it into json instance
                name: state.value.newTask
            })
        }
        fetch("http://localhost:3000/tasks/new", requestOptions)

    }
    const deleteTask = (_id) =>{
        fetch("http://localhost:3000/tasks/delete/" + _id, { method: "DELETE" })
        .then(getAllTasks())
    }
    const editTask = () => {
        const requestOptions = {
            method: "PUT",
            headers: {
                //if we dont put this in sometimes it might not accept the data
                "Content-Type": "application/json"
                //"auth-token": state.token --use tokens
            },
            body: JSON.stringify({ //stringify gets the data and converts it into json instance
                name: state.value.newTask,
                // todo: state.value.newTodoItem
            })
        }
        fetch("http://localhost:3000/tasks/update/" + taskId.value, requestOptions)
        .then(res => res.body)
        .then(res => {console.log(res)})
        router.push('/') //sends to the todos page
    }

    const task = ref({})
    const GetSpecificTask = async() =>{
        try {
            fetch("http://localhost:3000/tasks/get/"+taskId.value)
            .then(res => res.json())
            .then(data => {
               task.value = data//value because we work with refs
            })
        }
        catch (error) {
            console.log(error)
        }
    }


    return {
        state,
        task,
        taskId,
        GetSpecificTask,
        getAllTasks,
        newTask,
        deleteTask,
        editTask
    }
}

export default getTasks