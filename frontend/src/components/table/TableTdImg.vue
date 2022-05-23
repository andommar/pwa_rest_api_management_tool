<template>
<td>
    <div class="d-flex justify-content-center">
        <img :src="image" alt="">
    </div>
</td>
</template>

<script>
export default {
    props:['image']

}
</script>

<style scoped>
.user-icon img {
    height: 52px;
    width: auto;
    background-color: rgb(253,104,20);
    border-radius: 50%;
}
</style>