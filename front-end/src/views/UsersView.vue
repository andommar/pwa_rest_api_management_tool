<template>
<div>
    <Header/>
      <div class="row">
        <SideBar/>
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div class="row">
                <h4>Users</h4>
            </div>
            <div class="row m-4">
                <!-- <div v-if="errMsg"> {{error}}</div> -->
                <Suspense>
                    <template #default>
                        <ViewTable />
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
import {useStore} from 'vuex'
import { onMounted } from '@vue/runtime-core'
import {ref} from 'vue'
export default {
    components:{
        Header,
        SideBar,
        ViewTable
    },
    setup(){
        const store = useStore()
        // const errMsg = ref(null)
        // onErrorCaptured(()=>{
        //     errMsg.value = "Something went wrong"
        // })
    return {}
    }
}
</script>

<style scoped>

</style>