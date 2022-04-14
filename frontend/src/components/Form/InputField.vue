<template>
    <div class="form-group">
        <label>{{ label }}</label>
        <input 
        v-bind="$attrs"
        :placeholder="label"
        class="form-control" 
        :value="modelValue" 
        @input="$emit('update:modelValue', $event.target.value)"/>
    </div>
    <!-- v-bind we can bind html attributes and css classes -->
</template>



<script>
export default {
    name: 'InputField',
    props: {
        label: {
            type: String,
            default: ''
        },
        // input can be either String or Number
        modelValue: {
            type: [String, Number],
            default: ''
        }
    }

}
</script>

<style>

</style>