import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'

/*重置样式*/
import './assets/css/reset.css'
/*rem适配*/
import './assets/js/rem'

Vue.use(VueLazyload, {
    preLoad: 1.3,
    attempt: 3
})

new Vue({
    el:'#app',
    render:h=>h(App),
    router,
    store
})