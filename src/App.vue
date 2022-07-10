<template>
  <header> 
    <div class="logo">
      <img alt="weather-logo" src="./assets/images/logo.png">
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
