<template>
<div class="row">
    <div class="d-flex align-items-center my-2">
        <div class="col-md-3">
            <div class="font-weight-bold">{{title}}</div>
        </div>
        <div class="col-md-7">
            <div class="progress" style="height: 20px;">
                <div class="progress-bar" v-bind="$attrs" role="progressbar" :style="progress" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        </div>
        <div class="col-md-2 px-2">
            <div> {{ hours.hoursValue }}</div>
        </div>
    </div>
</div>


</template>

<script>
import { computed } from '@vue/runtime-core'

export default {
    props:['title', 'color', 'hours'],
    inheritAttrs: false,
    setup(props){
        const progress = computed(()=>{
            const percentage = Math.floor((props.hours.hoursValue *100)/props.hours.totalHours)
            console.log(percentage)
            return "width: "+percentage+"%"
        })
    return {progress}
    }

}
</script>

<style>

</style>