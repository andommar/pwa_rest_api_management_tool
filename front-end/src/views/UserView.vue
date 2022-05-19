<template>
<div>
      <Header/>
      <div class="row">
        <SideBar/>
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <Suspense>
                <template #default>
                    <div class="m-3">
                            <div class="row d-flex justify-content-center">
                                <div class="col-md-7 bg-white border-left-yellow">
                                    <div class="row d-flex my-2">
                                        <div class="col-md-3 d-flex flex-column justify-content-center align-items-center">
                                            <ImgComponent :class="['bg-color', 'user-avatar-info']" :imageSrc="member.avatar"/>
                                            <h4>{{member.username}}</h4>
                                        </div>
                                        <div class="col-md-7 d-flex flex-column justify-content-center">
                                            <div class="d-flex">
                                                <btnIcon class="btn btn-blue" text='Edit' icon='pencil'/>
                                            </div>

                                            <div class="row">
                                                <div class="col-md-3">
                                                    <div class="font-bold">Name: </div>
                                                    <div class="font-bold">Email: </div>
                                                    <div class="font-bold">Joined: </div>
                                                    <div class="font-bold">Active: </div>
                                                </div>
                                                <div class="col-md-9">
                                                    <div>{{member.name}} {{member.surname}}</div>
                                                    <div>{{member.email}}</div>
                                                    <div>{{member.joined}}</div>
                                                    <div>{{member.active}}</div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <hr>
                                    <div class="row d-flex">
                                        <h5>Projects</h5>
                                        <div class="d-flex justify-content-between flex-wrap">
                                            <div class="project-card">
                                                hello
                                            </div>
                                            <div class="project-card">
                                                hello
                                            </div>
                                            <div class="project-card">
                                                hello
                                            </div>
                                            <div class="project-card">
                                                hello
                                            </div>
                                            <div class="project-card">
                                                hello
                                            </div>
                                            <div class="project-card">
                                                hello
                                            </div>
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="row d-flex">
                                        <h5>Tasks</h5>
                                        <div class="d-flex justify-content-between flex-wrap">
                                            <div class="project-card">
                                                hello
                                            </div>
                                            <div class="project-card">
                                                hello
                                            </div>
                                            <div class="project-card">
                                                hello
                                            </div>
                                            <div class="project-card">
                                                hello
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </template>
                <template #fallback>
                    Loading info...
                </template>
            </Suspense>
        </main>
      </div>
</div>

</template>

<script>
import Header from '../components/ui/Header.vue'
import SideBar from '../components/ui/SideBar.vue'
import ImgComponent from '../components/ui/imgComponent.vue'
import {useStore} from 'vuex'
import btnIcon from '../components/input/btnIcon.vue'
import { useRoute } from 'vue-router'
import { computed,onMounted } from '@vue/runtime-core'

export default {
    components: {
        Header,
        SideBar,
        btnIcon,
        ImgComponent
    },
    setup(){
        const route = useRoute()
        const id = route.params.id
        const store = useStore()

        const member = computed (()=> {
            return store.getters.getMember
        })

        console.log(member)
        onMounted(async ()=>{
            await store.dispatch('fetchMember', id)
        })

        return {id, member}
    }
}
</script>

<style scoped>
.project-card{
    height: 120px;
    width: 120px;
    background-color: aqua;
    margin: 5px 5px;
}
.font-bold{
    font-weight: 600;
}
</style>