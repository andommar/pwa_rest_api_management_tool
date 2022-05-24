<template>
<div>
    <Header/>
      <div class="row">
        <SideBar/>
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div class="row m-4">
                <h4>Users</h4>
            </div>
            <div class="row m-4">
                <div class="mb-4">
                    <searchBar v-model="text" @action ="processSearch"/>
                </div>
                <Suspense>
                    <template #default>
                        <ViewTable :admin="isAdmin" :users="users"/>
                    </template>
                    <template #fallback>
                        Loading Table...
                    </template>
                </Suspense>
            </div>
        </main>
      </div>
</div>

</template>

<script>

import Header from '../components/ui/Header.vue'
import SideBar from '../components/ui/SideBar.vue'
import ViewTable from '../components/table/ViewTable.vue'
import searchBar from '../components/input/searchBar.vue'
import {useStore} from 'vuex'
import { computed, onMounted } from '@vue/runtime-core'
import {ref} from 'vue'
export default {
    components:{
        Header,
        SideBar,
        ViewTable,
        searchBar
    },
    setup(){
        const store = useStore()
        const isAdmin = ref(store.getters.isUserAdmin)
        const text = ref('')

        
        const user = computed(()=>{
            return store.getters.getUser
        })

        const processSearch = () =>{
            console.log(text.value)
            store.dispatch('filterMember', text.value)
        }

        const users = computed(()=>{
            return store.getters.getFilteredMembers
        })

        onMounted(async ()=>{
            const userId = localStorage.getItem('user')
            await store.dispatch('fetchMembers')
            await store.dispatch('fetchUser', userId)
        })

        return {isAdmin, user, text, users, processSearch}
    }
}
</script>

<style scoped>

</style>