<template>
 <div class="home">

    <div>  
			<div v-if="allDatas.length" id="city-page">
				
				<div class="current-city"> 
					<div>
						<h1> {{name}} </h1>

						<ul> 
							<li> {{weatherApiData.resolvedAddress}} </li>
							<li> {{cityApiData[0].latitude}}° N, {{cityApiData[0].longitude}} ° E </li>
						</ul>
					</div>

					<div class="current-city-temp"> 
						<div>
							<img :src = "require(`@/assets/images/icons/${weatherApiData.currentConditions.icon}.svg`)" :alt="`${weatherApiData.currentConditions.icon}`"/> 
						</div> 
						<p> {{parseInt(weatherApiData.currentConditions.temp)}}°C </p>
					</div>
					
					<ul>
						<li> <span> Feels like </span> {{ weatherApiData.currentConditions.feelslike }} </li>
						<li> <span> Humidity </span> {{ weatherApiData.currentConditions.humidity }} </li>
						<li> <span> Pressure </span> {{ weatherApiData.currentConditions.pressure }} </li>
						<li> <span> Wind </span> {{ weatherApiData.currentConditions.windspeed }} m/s {{ direction }}</li>
						<li> <span> UV index </span> {{ weatherApiData.currentConditions.uvindex }} </li>
					</ul>
				</div>

				<div class="next-days-weather"> 
					<div v-for="day in weatherApiData.days.slice(1,4)" :key="day"> 
						<div class="date-label"> {{formatDate(day.datetime)}} </div>  

						<div class="hourly-weather-wrapper">
							<div class="hourly-weather" v-for="hour in day.hours" :key="hour">
								
								<div> {{hour.datetime.slice(0,2)}}h </div>

								<div class="icon">
									<img :src = "require(`@/assets/images/icons/${hour.icon}.svg`)" :alt="`${hour.icon}`"/>
								</div> 

								<div> {{parseInt(hour.temp)}}°C </div>
							
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
import { onMounted, ref } from 'vue'

export default {
  name: 'WeatherDetails',
  props: ['name'],
  setup(props) {

    let allDatas = ref([]),
				cityApiData =  ref([]),
				weatherApiData = ref([]);

		const direction = ref([]);
    
    onMounted( () => {
			let citiesData = API.getCityName(props.name).then((result) => {
					return result;
			});
			let watherData = API.getWeatherData(props.name).then((result) => {
					return result;
			});
			
			Promise.all([citiesData, watherData]).then((result) => { 
					allDatas.value = result;
					cityApiData.value = result[0];
					weatherApiData.value = result[1];

					let winddir = weatherApiData.value.days[1].winddir;

					console.log(weatherApiData)

					//calculate compass direction
					direction.value = ['N','NE', 'E','SE', 'S','SW', 'W','NW'][Math.floor(((winddir+22.5)%360)/45)]

			});
    });


		function formatDate(value) {
				const date = new Date(value);
				const options = { weekday: 'long', month: 'short', day: 'numeric' };
				return new Intl.DateTimeFormat('en', options).format(date);
		}


    return { allDatas, weatherApiData, cityApiData, direction, formatDate }
  }
}
</script>

<style>

</style>
