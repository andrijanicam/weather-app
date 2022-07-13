<template>

  <div class="container content">
    <header> 
      <div class="logo">
        <router-link :to="{ name: 'Home'}"> <img alt="weather-logo" src="./assets/images/logo.png"> </router-link>
      </div>
    </header>

    <router-view/>
  </div>
  
  <footer> 
    <div class="container"> 
      <div> Frontend </div>
    </div>
  </footer>
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
