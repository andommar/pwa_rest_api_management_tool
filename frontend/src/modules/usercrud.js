import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';

const getUsers = () => {

    const route = useRoute();
    const router = useRouter();

    const userId = computed(()=> route.params.taskid)


    const userState = ref({
        newUser:'',
        users: {}
    })


    const getAllUsers = async () => {
        try {
            await fetch("http://localhost:3000/users")
            .then(res => res.json())
            .then(data =>{
                userState.value.users = data
            })
        }
        catch(error) {
            console.log(error)
        }
    }

    const newUser = () => {
        const requestOptions = {
            method: "POST",
            headers: {
                //if we dont put this in sometimes it might not accept the data
                "Content-Type": "application/json"
                //"auth-token": state.token --use tokens
            },
            body: JSON.stringify({ //stringify gets the data and converts it into json instance
                name: userState.value.newUser
            })
        }
        fetch("http://localhost:3000/users/new", requestOptions)

    }
    const deleteUser = (_id) =>{
        fetch("http://localhost:3000/users/delete/" + _id, { method: "DELETE" })
        .then(getAllUsers())
    }
    const editUser = () => {
        const requestOptions = {
            method: "PUT",
            headers: {
                //if we dont put this in sometimes it might not accept the data
                "Content-Type": "application/json"
                //"auth-token": state.token --use tokens
            },
            body: JSON.stringify({ //stringify gets the data and converts it into json instance
                name: userState.value.newUser,
                // todo: state.value.newTodoItem
            })
        }
        fetch("http://localhost:3000/users/update/" + userId.value, requestOptions)
        .then(res => res.body)
        .then(res => {console.log(res)})
        router.push('/') //sends to the todos page
    }

    const User = ref({})
    const GetSpecificUser = async() =>{
        try {
            fetch("http://localhost:3000/users/get/"+userId.value)
            .then(res => res.json())
            .then(data => {
               User.value = data//value because we work with refs
            })
        }
        catch (error) {
            console.log(error)
        }
    }


    return {
        userState,
        User,
        userId,
        GetSpecificUser,
        getAllUsers,
        newUser,
        deleteUser,
        editUser
    }
}

export default getUsers