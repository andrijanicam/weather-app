import axios from "axios";

const CITY_API_URL = 'https://api.api-ninjas.com/v1/city?name=',
    WEATHER_API_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';

// getting data from API for city
const getCityName = async ( city ) => {

      const option = {
          method: 'get',
          headers: { 
              'X-Api-Key': `${process.env.VUE_APP_CITY_API_KEY}`
          },
          url: `${CITY_API_URL}${city}`,
          validateStatus: function (status) {
              return status >= 200 && status < 300; // default
          }
      };
    
    try {
      const response = await axios(option);
      return response.data;

    } catch (error) {
      const { response } = error;
      const { request, ...errorObject } = response; // take everything but 'request'
      throw(errorObject);
    }
  
}

// getting data from API for weather
const getWeatherData = async ( city ) => {

      const option = {
          method: 'get',
          url: `${WEATHER_API_URL}${city}?unitGroup=metric&key=${process.env.VUE_APP_WEATHER_API_KEY}&contentType=json`,
          validateStatus: function (status) {
              return status >= 200 && status < 300; 
          }
      };
    
    try {
      const response = await axios(option);
      return response.data;

    } catch (error) {
      const { response } = error;
      const { request, ...errorObject } = response; 
      throw(errorObject);
    }

}


export default {
    getCityName,
    getWeatherData
};
  