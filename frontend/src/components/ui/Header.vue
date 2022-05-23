<template>
<div class="row">
        <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <div class="navbar-nav">
            <router-link to="/">
                <div class="px-3">Jrello</div>
            </router-link>
        </div>

        <div class="navbar-nav">
            <div class="d-flex user-profile align-items-center">
            <img class="avatar-color-orange" :src="user.avatar" alt="">
            <div class="pl-1 pr-2">{{user.username}}</div>
            <router-link to="/login">
                <button @click="userSignOut" class="btn btn-warning mx-2"> Sign Out</button>
            </router-link>
            </div>

        </div>
    </header>
</div>
</template>

<script>
import {ref} from 'vue'
import {useStore} from 'vuex'
import btnTableIcon from '../input/btnIcon.vue'
import { computed, onMounted } from '@vue/runtime-core'
export default {
    components:{
        btnTableIcon
    },
    setup(){
        const store = useStore()

        const user = computed(()=>{
            return store.getters.getUser
        })

        const userSignOut = () => store.dispatch('signOut')
        onMounted(async ()=>{
            const userId = localStorage.getItem('user')
            await store.dispatch('fetchUser', userId)
        })

        return {user, userSignOut}
    }

}
</script>

<style scoped>
a{
    font-size: 1.2rem !important;
    color:white
}
.user-profile{
    font-size: 1.2rem !important;
    color:white
}
.user-profile img {
    height: 32px;
    width: auto;
    margin: 0px 5px;
    border-radius: 50%;
}
.avatar-color-orange{
    background-color:rgb(253,104,20);
}

</style>