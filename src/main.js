import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './store'
import router from './router'
import './registerServiceWorker'

import {auth} from '@/fb'

Vue.config.productionTip = false
var app
auth.onAuthStateChanged(() => {
	if(!app){
		new Vue({
			vuetify,
			store,
			router,
			render: h => h(App)
		}).$mount('#app')
	}
})
