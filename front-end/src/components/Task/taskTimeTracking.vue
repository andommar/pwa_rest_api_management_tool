<template>
<div class="my-4">
    <div class="col mx-2 my-2">
        <h5>Time tracking</h5>
    </div>
    <div class="col mx-2 d-flex flex-column my-1">
        <TimeProgressBar title='Estimated' class='bg-info'/>
        <TimeProgressBar title='Remaining' class='bg-warning'/>
        <TimeProgressBar title='Logged' class='bg-success'/>
    </div>
</div>
</template>

<script>
import TimeProgressBar from './taskProgressBar.vue'
export default {
    components: {
        TimeProgressBar
    }

}
</script>

<style>

</style>