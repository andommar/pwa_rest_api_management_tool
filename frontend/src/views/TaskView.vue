<template>
<div class="row">
    <Navigator />
    <div class="row gx-2">
        <div class="col-md-7 border border-left-0 border-light rounded ">
            <div class="col mx-2 my-3">
                <h3>{{task.title}}</h3>
            </div>
            <div class="col m-2">
                <h5>Description</h5>
            </div>
            <div class="col mx-2">
                <p>{{task.description}}</p>
            </div>
        </div>
        <div class="col-md-3 border border-left-0 border-light rounded offset-1">
            <div class="col mx-2 my-3">
                <h5>Status</h5>
            </div>
            <div class="col m-2 d-flex">
                <div class="p-2">
                    <div class="bg-info p-2 text-white rounded">Done</div>
                </div>
                <div class="p-2">
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown button
                            </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </div>
                </div>

            </div>
            <div class="col mx-2">
                <p>{{task.description}}</p>
            </div>
        </div>
    </div>


</div>
</template>

<script>
import { onMounted } from '@vue/runtime-core'
import taskcrud from '../modules/taskcrud'
import Navigator from '../components/ui/Navigation/Navigator.vue'
export default {
    components: {Navigator},
    setup(){
        const {GetSpecificTask, task} = taskcrud();

        onMounted(() => {
            GetSpecificTask();
        })
        return {task}
    }
}
</script>

<style>

</style>