<template>
    <div class="form-row">
        <div class="form-group col-md-4">
            <label for="inputState">Team leader</label>
            <select id="inputState" class="form-control" value="modelValue" @input="$emit('update:modelValue', $event.target.value)"> 
                <option selected>Choose...</option>
                <option v-for="user in userState.users" :key="user._id" :value="user._id" > 
                    {{ user.name }} {{user.surname}}
                </option>
            </select>
        </div>
    </div>
    
</template>

<script>
import usercrud from '../../modules/usercrud'
import { onMounted } from '@vue/runtime-core'

export default {
    name:'InputDropdownForm',
    props: ['modelValue'],
    setup(){
        const {userState, getAllUsers} = usercrud()

    onMounted(() => {
        getAllUsers();
    })
    return {userState}
    }

}
</script>

<style>

</style>