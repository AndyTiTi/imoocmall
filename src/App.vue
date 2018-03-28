<template>
  <div id="app">
    <GoodsList></GoodsList>
  </div>
</template>

<script>
  import './assets/css/checkout.css'
  import './assets/css/login.css'
  import GoodsList from './views/GoodsList'
  export default {
    components: {
      GoodsList
    }
  }
</script>
