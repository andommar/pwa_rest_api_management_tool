import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';

const getAuth = () => {

    const route = useRoute();
    const router = useRouter();

    // const userId = computed(()=> route.params.taskid)


    const authState = ref({
        auth: {}
    })


    const getLogin = async () => {
        try {
            await fetch("http://localhost:3000/user/login")
            .then(res => res.json())
            .then(data =>{
                authState.value.auth = data
            })
        }
        catch(error) {
            console.log(error)
        }
    }

    const loginUserAuth = () => {
        const requestOptions = {
            method: "POST",
            headers: {
                //if we dont put this in sometimes it might not accept the data
                "Content-Type": "application/json"
                //"auth-token": state.token --use tokens
            },
            body: JSON.stringify({ //stringify gets the data and converts it into json instance
                email: authState.value.email,
                password: authState.value.password,
            })
        }
        fetch("http://localhost:3000/user/login", requestOptions)

    }


    // const User = ref({})
    // const GetSpecificUser = async() =>{
    //     try {
    //         fetch("http://localhost:3000/users/get/"+userId.value)
    //         .then(res => res.json())
    //         .then(data => {
    //            User.value = data//value because we work with refs
    //         })
    //     }
    //     catch (error) {
    //         console.log(error)
    //     }
    // }


    return {
        authState,
        loginUserAuth
    }
}

export default getAuth