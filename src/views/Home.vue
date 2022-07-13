<template>
  <div class="home">
    <div class="description">
      <p>Add Cities</p>
      <p>Add 5 cities whose temperature you want to track</p>
    </div>

    <div class="input-field">
      <input
        v-model="location"
        type="text"
        class="form-control"
        placeholder="Add a city ..."
      />
      <div class="input-field-icon">
        <font-awesome-icon icon="fa-solid fa-circle-plus" />
      </div>
      <button  @click="updateLocation">Add</button>
      <div class="error" v-if="errors.showError.value">
        {{ errors.message.value }}
      </div>
    </div>

    <div>
      <div class="cards">
        <div
          class="cards-inner"
          v-for="cityCard in localStorageData"
          :key="cityCard.city"
        >
          <h3>{{ cityCard.city }}</h3>
          <p>{{ cityCard.country }}</p>
          <p>{{ parseInt(cityCard.temp) }}°C</p>
          <router-link
            class="button"
            :to="{
              name: 'SingleCityPage',
              params: { name: cityCard.city, data: localStorageData },
            }"
          >
            View City
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from "@/lib/API";
import { onMounted, ref } from "vue";

export default {
  name: "Home",
  components: {},
  setup() {
    let allDatas = ref([]),
      cardCitiesObject = ref([]),
      location = ref(""),
      localStorageData = ref([]),
      errors = {
        showError: ref(false),
        message: ref(""),
      };

    
    function updateLocation() {
      validate();

      let citiesData = API.getCityName(location.value).then((result) => {
        return result;
      });
      let watherData = API.getWeatherData(location.value).then((result) => {
        return result;
      });
     
        // get data from both API at the same time
        Promise.all([citiesData, watherData]).then((result) => {
          if (!errors.showError.value) {
          // result is returning two arrays from two API-s
          allDatas.value = result;
          
            let // first array[0] return result from first API
              // second array[0] return first array result from first API
              cityArrName = result[0][0].name,
              cityArrCountry = result[0][0].country,
              weatherArrayTemp = result[1].currentConditions.temp;

            // GET COUNTRY NAME FROM COUNTRY CODE
            const regionNamesInEnglish = new Intl.DisplayNames(["en"], {
              type: "region",
            });
            cityArrCountry = regionNamesInEnglish.of(cityArrCountry);

            class MainData {
              constructor(city, country, temp) {
                this.city = city;
                this.country = country;
                this.temp = temp;
              }
            }

            cardCitiesObject = new MainData(
              cityArrName,
              cityArrCountry,
              weatherArrayTemp
            );

            // Set localStorage item
            localStorageData.value.push(cardCitiesObject);
            localStorage.localStorageData = JSON.stringify(
              localStorageData.value
            );
          }
           errors.showError.value = true;
        }).catch(error => {
          // console.log(error);
          errors.message.value = 'Please enter valid city name';
          errors.showError.value = true;
          
          setTimeout(() => {
            errors.showError.value = false;
            errors.message.value = "";
          }, 1500); 
        });

      // RESET LOCATION VALUE
      location.value = "";
    }

    onMounted(() => {
      if (localStorage.localStorageData) {
        localStorageData.value = JSON.parse(localStorage.localStorageData);
      }
    });

    function validate() {

      if (localStorageData.value.length) {
        const cityNameLower = localStorageData.value.map((element) => {
          return element.city.toLowerCase();
        });

         if (cityNameLower.includes(location.value.toLowerCase())) {
          errors.message.value = "You already added this city";
          errors.showError.value = true;
        } else if (localStorageData.value.length > 4 && location.value !== '') {
          errors.message.value = 'You already added five cities';
          errors.showError.value = true;
        } 

        else {
          errors.showError.value = false;
          errors.message.value = "";
        }

        // hide error after time
        setTimeout(() => {
          errors.showError.value = false;
          errors.message.value = "";
        }, 1500); 
      }

      return errors;
    }

    return {
      location,
      updateLocation,
      allDatas,
      errors,
      localStorageData,
      validate,
    };
  },
};
</script>

<style>
</style>
