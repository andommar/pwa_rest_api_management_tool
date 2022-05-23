import router from '../../router'

const URI = "http://localhost:3000/"
// heroku = "https://jrelloapp.herokuapp.com/"

export default ({
    state: {
        user: null,
        registerError: null
    },
    getters: {
        userAuthenticated(state){
            console.log('autenticated',state.user)
            if(state.user || localStorage.getItem('token'))
                return true
            else
                return false
        },
        isUserAdmin(state){
            if(state.user.admin)
                return true
        },
        getUserProjects(state){
            return state.user.projectsAssigned
        },
        getUser(state) {
            return state.user
        },
        getRegisterError(state) {
            return state.registerError
        },
    },
    mutations: {
        setUser (state, payload) {
            state.user = payload
        },
        setError (state, payload) {
            state.registerError = payload
        }
    },
    actions: {
        signOut ({commit}){
            router.push('/login')
            localStorage.removeItem('user')
            localStorage.removeItem('token')
        },

        async loadLocalStorage({commit, state}) {
            if(localStorage.getItem('token')){
                commit('setUser', localStorage.getItem('token'))
            } else {
                return commit('setUser', null)
            }
        },
        async fetchUser ({commit}, userId){
            try {
                const res = await fetch("http://localhost:3000/users/get/"+userId)
                const data = await res.json()
                commit('setUser', data)
                console.log(data)
            }
            catch (error) {
                console.log(error)
            }
        },
        async loginUser ({commit} , user ) {
            try{
                const requestOptions = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify ({
                        email: user.email,
                        password: user.password

                    })
                }
                const res = await fetch('http://localhost:3000/user/login', requestOptions)
                const userDB = await res.json()
                // console.log(userDB.data.token)
                if(userDB.error){
                    return console.log(userDB.error)
                }
                commit('setUser', userDB.data)
                localStorage.setItem('token', userDB.data.token)
                localStorage.setItem('user', userDB.data.result._id)
                router.push('/')
                
            } catch (error) {
                console.log(error)
            }
        },
        async registerUser( {commit} , user) {
            console.log(user)
            try {
                const requestOptions = {
                    method: "POST",
                    headers: {
                        //if we dont put this in sometimes it might not accept the data
                        "Content-Type": "application/json"
                        //"auth-token": state.token --use tokens
                    },
                    body: JSON.stringify({ //stringify gets the data and converts it into json instance
                        name: user.name,
                        surname: user.surname,
                        email: user.email,
                        username: user.username,
                        password: user.password,
                        avatar: user.avatar,
                    })
                }
                const res = await fetch("http://localhost:3000/user/register", requestOptions)

                const userDB = await res.json()
                console.log(userDB)
                if(!userDB.error){
                    commit('setUser', userDB)
                    router.push('/login')
                } else {
                    commit('setError', userDB.error)
                }

            } catch (error) {
                console.log(error)
            }

        }
    },
    modules: {
    }
  })