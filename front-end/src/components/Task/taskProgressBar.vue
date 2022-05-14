<template>
<div class="row">
    <div class="d-flex align-items-center my-2">
        <div class="col-md-3">
            <div class="font-weight-bold">{{title}}</div>
        </div>
        <div class="col-md-7">
            <div class="progress" style="height: 20px;">
                <div class="progress-bar" v-bind="$attrs" role="progressbar" style="width: 50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        </div>
        <div class="col-md-2 px-2">
            <div> 33 h</div>
        </div>
    </div>
</div>


</template>

<script>
export default {
    props:['title', 'color'],
    inheritAttrs: false

}
</script>

<style>

</style>