<template>
<div class="row height d-flex justify-content-center align-items-center">

    <div class="col-md-6">

        <div class="form">
        <i class="fa fa-search"></i>
        <input 
        type="text" 
        class="form-control form-input"
        placeholder="Search ..."
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @keyup="action">
        <span class="left-pan"><i class="bi bi-search"></i></span>
        </div>
        
    </div>

</div>
</template>

<script>
import {useStore} from 'vuex'
import {ref} from 'vue'

export default {
    props:['modelValue'],
    setup(props,context){
        const store = useStore()

        const action = ((event) =>{
            context.emit("action", event.target.value)
        })

        return {action}
    }
}
</script>

<style>

.form{

    position: relative;
}

.form .fa-search{

    position: absolute;
    top:20px;
    left: 20px;
    color: #9ca3af;

}

.form span{

        position: absolute;
    right: 17px;
    top: 13px;
    padding: 2px;
    border-left: 1px solid #d1d5db;

}

.left-pan{
    padding-left: 7px;
}

.left-pan i{
   
   padding-left: 10px;
}

.form-input{

    height: 55px;
    text-indent: 33px;
    border-radius: 10px;
}

.form-input:focus{

    box-shadow: none;
    border:none;
}
</style>