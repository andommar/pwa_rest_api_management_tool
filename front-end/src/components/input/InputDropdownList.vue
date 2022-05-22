<template>
    <div class="form-row">
        <div class="form-group">
            <!-- <label for="inputState">{{ label }}</label> -->
            <select id="inputState" class="form-control" value="modelValue" @input="$emit('update:modelValue', $event.target.value)"> 
                <option v-for="member in memberList" :key="member._id" :value="member._id" > 
                    {{ member.name }} {{member.surname}}
                </option>

            </select>
        </div>
    </div>
    
</template>

<script>
import { onMounted } from '@vue/runtime-core'

export default {
    name:'InputDropdownForm',
    props: ['modelValue', 'memberList'],
    setup(){

    onMounted(() => {
    })
    return {}
    }

}
</script>

<style>

</style>