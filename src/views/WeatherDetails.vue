<template>
 <div class="home">

    <div>  
      
			
			<div v-if="allDatas.length">
				<h1> {{name}} </h1>
				<div> {{allDatas[1].resolvedAddress}} </div>
				<div> {{allDatas[0][0].latitude}} {{allDatas[0][0].longitude}} </div>


				<div> {{allDatas[1].currentConditions.temp}} </div>

				<div> Feels like {{allDatas[1].currentConditions.feelslike}} </div>
				<div> Humidity {{allDatas[1].currentConditions.humidity}} </div>
				<div> Pressure {{allDatas[1].currentConditions.pressure}} </div>
				<div> Wind </div>
				<div> UV index {{allDatas[1].currentConditions.uvindex}} </div>

					<div> 
						<div v-for="day in days" :key="day"> 
							<div> {{formatDate(day.datetime)}} </div>  

							<div class="hourly-weather-wrapper">
								<div class="hourly-weather" v-for="hour in day.hours" :key="hour">
									{{hour.datetime}}h 
									{{hour.temp}}
								</div> 
							</div>
						</div>

					</div>

			</div>
    </div>
 </div>
</template>

<script>

import API from '@/lib/API';
import { onMounted, ref, computed } from 'vue'

export default {
  name: 'WeatherDetails',
  props: ['name'],
  setup(props) {

    let allDatas= ref([]),
				days = ref([]);
    
    onMounted( () => {
			let citiesData = API.getCityName(props.name).then((result) => {
					return result;
			});
			let watherData = API.getWeatherData(props.name).then((result) => {
					return result;
			});
			
			Promise.all([citiesData, watherData]).then((result) => { 
					allDatas.value = result;

					// data for the next 3 day
					days.value = result[1].days.slice(1,4);
			});
    });


		function formatDate(value) {
				const date = new Date(value);
				const options = { weekday: 'long', month: 'short', day: 'numeric' };
				return new Intl.DateTimeFormat('en', options).format(date);
		}


    return { allDatas, formatDate, days }
  }
}
</script>

<style>

</style>
