<template>
  <div class="wrapper">
    <v-head></v-head>
    <v-sidebar></v-sidebar>
    <div class="content">
      <transition name="move" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
  import vHead from './SystemHeader.vue';
  import vSidebar from './Sidebar.vue';

  export default {
    data(){
      return {
        showAdmin:false
      }
    },
    components: {
      vHead,
      vSidebar
    }
  }
</script>
