<template>
    <div class="col m-2 d-flex align-items-center">
        <div  class="col-md-2">{{label}}</div>
        <div class=" col-md-1 mx-2">
            <img :src=params.avatar alt="asignee-avatar" class="img-fluid user-avatar">
        </div>
        <div class="col-md-6">{{ params.name }} {{params.surname}}</div>
    </div>
</template>

<script>
export default {
    props:['params', 'label'],
    setup(props){
        console.log(props.params)
    }

}
</script>

<style scoped>
img{
    height: 32px;
    width: auto;
    background-color: rgb(253,104,20);
    border-radius: 50%
}
</style>