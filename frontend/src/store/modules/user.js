import router from '../../router'


export default ({
    state: {
        user: null
    },
    getters: {
        userAuthenticated(state){
            console.log('autenticated',state.user)
            if(state.user || localStorage.getItem('token'))
                return true
            else
                return false
        }
    },
    mutations: {
        setUser (state, payload) {
            state.user = payload
        }
    },
    actions: {
        async loadLocalStorage({commit, state}) {
            if(localStorage.getItem('token')){
                commit('setUser', localStorage.getItem('token'))
            } else {
                return commit('setUser', null)
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
                router.push('/')
                localStorage.setItem('token', userDB.data.token)
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
                        password: user.password,
                    })
                }
                const res = await fetch("http://localhost:3000/user/register", requestOptions)

                const userDB = await res.json()
                console.log(userDB)
                // if(!userDB.error)
                //     commit('setUser', userDB)
            } catch (error) {
                console.log(error)
            }

        }
    },
    modules: {
    }
  })