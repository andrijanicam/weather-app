<template>
 <div class="home">

    <div> 
      <p> Add Cities </p>
      <p> Add 5 cities whose temperature you want to track </p>
    </div>

    <div> 
      <input v-model="location" type="text" class="form-control" placeholder="Add a city ...">

      <div class="input-group-append">
        <button @click="updateLocation">Add</button>
      </div>
    </div>

    <div>
      <div v-for="cityCard in retrievedObject" :key="cityCard.city"> 
        {{cityCard.city}}
        {{cityCard.country}}
        {{cityCard.temp}}
        Vidi više
      </div>

        <div class="weather-card" v-if="citiesData">
          <div v-for="city in citiesData" :key="city.name"> 
              <p> {{city.name}} </p>
              <p> {{city.country}} </p>
          </div>
        
          <!-- <router-link :to="{ name: 'CardName', params: { name: city.name }}"> {{city.name}} </router-link> -->
      </div>
    </div>
 </div>
</template>

<script>

import API from '@/lib/API';
import {computed, onMounted, ref } from 'vue'

export default {
  name: 'Home',
  components: {},
  setup() {

    let 
      allDatas= ref([]),
      cardCitiesObject= ref([]),
      location = ref(''),
      localStorageData = ref([]),
      retrievedObject = ref([]);

    function updateLocation() {
      let citiesData = API.getCityName(location.value).then((result) => {
          return result;
      });
      let watherData = API.getWeatherData(location.value).then((result) => {
          return result;
      });

      // Get data from both API at the same time
      Promise.all([citiesData, watherData]).then((result) => { 
        // allDatas.value = result;
        
        // result is returning two arrays from two API-s
        // For cityArr: [0] - First array of two APIS, [0] - First array of API array
        let 
          cityArrName = result[0][0].name,
          cityArrCountry = result[0][0].country,
          weatherArrayTemp = result[1].currentConditions.temp;

        class MainData {
          constructor(city, country, temp) {
            this.city = city;
            this.country = country;
            this.temp = temp;
          }
        }

        cardCitiesObject = new MainData( cityArrName,cityArrCountry, weatherArrayTemp )
        
        // Set localStorage item
        localStorageData.value.push(cardCitiesObject)
        localStorage.setItem('localStorageData', JSON.stringify(localStorageData.value));

        // Retrieve the object from localStorage
        let retrievedObjects = localStorage.getItem('localStorageData')
        retrievedObject.value = JSON.parse(retrievedObjects);

      });
      // RESET LOCATION VALUE 
      location.value = '';        
    }

    onMounted( () => {
        // 
    });


    // COMPUTED

   
    return { location, updateLocation, allDatas, retrievedObject }

  }
}
</script>

<style>

</style>
