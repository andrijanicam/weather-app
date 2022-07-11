<template>
 <div class="home">

    <div>  
      
			
		<div v-if="allDatas.length">

			<div>
				<h1> {{name}} </h1>
				<div> {{weatherApiData.resolvedAddress}} </div>
				<div> {{cityApiData[0].latitude}} {{cityApiData[0].longitude}} </div>
			</div>

			<div> {{weatherApiData.currentConditions.temp}} </div>

			<div>
				<div> Feels like {{ weatherApiData.currentConditions.feelslike }} </div>
				<div> Humidity {{ weatherApiData.currentConditions.humidity }} </div>
				<div> Pressure {{ weatherApiData.currentConditions.pressure }} </div>
				<div> Wind {{ weatherApiData.currentConditions.windspeed }} m/s {{ direction }}</div>
				<div> UV index {{ weatherApiData.currentConditions.uvindex }} </div>
			</div>

			<div> 
				<div v-for="day in weatherApiData.days.slice(1,4)" :key="day"> 
					<div> {{formatDate(day.datetime)}} </div>  

					<div class="hourly-weather-wrapper">
						<div class="hourly-weather" v-for="hour in day.hours" :key="hour">
							{{hour.temp}}

							<div class="icon">
								<img :src = "require(`@/assets/images/icons/${hour.icon}.svg`)" :alt="`${hour.icon}`"/>
							</div> 

							{{hour.datetime.slice(0,2)}}h  
						
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
