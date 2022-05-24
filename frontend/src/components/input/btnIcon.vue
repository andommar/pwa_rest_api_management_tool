<template>
  <button @click="action" type="button">
    <i :class="iconClass"></i> {{text}}
  </button>
</template>

<script>
import {ref} from 'vue'
import { computed,onMounted } from '@vue/runtime-core'

export default {
  props: ['icon', 'text'],
  setup(props, context){
    console.log()

    const iconClass = computed (() =>{
        return 'bi bi-'+props.icon
    })

    const action = ((event)=>{
      context.emit("action", event.target.value)
    })
    return {iconClass,action}
  }
}
</script>

<style scoped>
.btn{
    border: 0px;
    padding: 5px 10px;
    border-radius: 5px;
    
}
.btn-grey:hover{
    background-color:rgb(108,117,125);
    color: white;
}
.btn-blue{
    background-color: rgb(25,146,212);
    color: white;
}
.btn-grey{
    background-color: rgb(226,232,240);
    color: black;


}

</style>