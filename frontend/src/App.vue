<template>
<div class="container-fluid">
  <div class="row">
    <Header/>
  </div>
  <div class="row">
    <SideBar/>
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <router-view/>
    </main>
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