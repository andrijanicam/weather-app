<template>
 <div class="home">

    <div> 
      <p> Add Cities </p>
      <p> Add 5 cities whose temperature you want to track </p>
    </div>

    <div class="input-field"> 
      <input v-model="location" type="text" class="form-control" placeholder="Add a city ...">
      <div class="input-field-icon"> <font-awesome-icon icon="fa-solid fa-circle-plus" /> </div>
      <button @click="updateLocation">Add</button>

      <div class="error" v-if="errors.showError"> {{errors.message.value}} </div>
    </div>
    

    <div>
      <div class="cards"> 
        <!-- {{localStorageData}}  -->
        <div class="cards-inner" v-for="cityCard in localStorageData" :key="cityCard.city">
          <h3> {{cityCard.city}} </h3>
          <p> {{cityCard.country}} </p>
          <p> {{cityCard.temp}}°C</p>
          <router-link class="button" :to="{ name: 'WeatherDetails', params: { name: cityCard.city, data: localStorageData }}"> View City </router-link>
          
        </div>
      </div>
        <!-- <router-link :to="{ name: 'CardName', params: { name: city.name }}"> {{city.name}} </router-link> -->
     
    </div>
 </div>
</template>

<script>

import API from '@/lib/API';
import { onMounted, ref } from 'vue'

export default {
  name: 'Home',
  components: {},
  setup() {

    let 
      allDatas= ref([]),
      cardCitiesObject= ref([]),
      location = ref(''),
      localStorageData = ref([]),
      errors =  {
          showError: ref(false),
          message: ref('')
      };

    function updateLocation() {
      let citiesData = API.getCityName(location.value).then((result) => {
          return result;
      });
      let watherData = API.getWeatherData(location.value).then((result) => {
          return result;
      });

      if(localStorageData.value.length < 5) {
        // get data from both API at the same time
        Promise.all([citiesData, watherData]).then((result) => { 

          // result is returning two arrays from two API-s  
          allDatas.value = result;

          let 
            // first array[0] return result from first API
            // second array[0] return result from first API first array
            cityArrName = result[0][0].name,
            cityArrCountry = result[0][0].country,
            weatherArrayTemp = result[1].currentConditions.temp;

          // GET COUNTRY NAME FROM COUNTRY CODE
          const regionNamesInEnglish = new Intl.DisplayNames(['en'], { type: 'region' });
          cityArrCountry = regionNamesInEnglish.of(cityArrCountry);

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
          localStorage.localStorageData = JSON.stringify(localStorageData.value);

        });
        // RESET LOCATION VALUE 
        location.value = '';        
      }

     else {
        errors.message.value = 'You added more then five cities';
        errors.showError.value = true;
      }
    }

    onMounted( () => {
        if(localStorage.localStorageData) {
          localStorageData.value = JSON.parse(localStorage.localStorageData)
        }
    });

    return { location, updateLocation, allDatas, errors, localStorageData }

  }
}
</script>

<style>

</style>
