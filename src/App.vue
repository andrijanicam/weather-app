<template>
  <header> 
    <div class="logo">
      <router-link :to="{ name: 'Home'}"> <img alt="weather-logo" src="./assets/images/logo.png"> </router-link>
    </div>
  </header>

  <router-view/>

  <footer> </footer>
</template>


<script>
  import './assets/css/style.scss';

  export default {
    name: 'App',
    setup() {
      
    }
  }
</script>

<style>

</style>
