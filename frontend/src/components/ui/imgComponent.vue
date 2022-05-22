<template>
  <img :src="imageSrc" alt="">
</template>

<script>
export default {
props:['imageSrc']
}
</script>

<style scoped>
.user-avatar-info{
  width: 105px;
  height: 105px;
  object-fit: cover;
  border-radius: 50%;

}
.bg-color{
    background-color:red
}
</style>