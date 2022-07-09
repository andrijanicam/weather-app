import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { 
    faCloud, faMoon, faSun, 
    faCloudMoon, faCloudSun, faCloudShowersHeavy 
} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add( 
    faCloud, faMoon, faSun, 
    faCloudMoon, faCloudSun, faCloudShowersHeavy 
)

createApp(App)
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
