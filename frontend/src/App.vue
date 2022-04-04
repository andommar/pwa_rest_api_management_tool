<template>
<div class="flex h-screen">
  <div class="flex-1 flex flex-col overflow-hidden">
    <Header />
    <div class="flex h-full">
      <SideBar />
      <router-view/>
      </div>
  </div>
</div>
</template>

<script>
import SideBar from './components/ui/SideBar/SideBar'
import Header from './components/ui/Header/Header'
export default {
    components: {
    SideBar,
    Header,
  },
}
</script>