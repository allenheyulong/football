import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueTouch from 'vue-touch'

/*重置样式*/
import './assets/css/reset.css'
/*rem适配*/
import './assets/js/rem'

Vue.use(VueTouch, {name: 'v-touch'})

VueTouch.config.swipe = {
    threshold: 100 //手指左右滑动距离
}

new Vue({
    el:'#app',
    render:h=>h(App),
    router,
    store
})