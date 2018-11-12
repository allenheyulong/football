import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home/Home'
import Mall from '../views/Mall/Mall'
import Play from '../views/Play/Play'
import Match from '../views/Match/Match'
import Data from '../views/Data/Data'
import Add from '../views/Add/Add'
import Forum from '../views/Forum/Forum'
import Category from '../views/Category/Category'
import ShoppingCar from '../views/ShoppingCar/ShoppingCar'
import ShoppingMall from '../views/ShoppingMall/ShoppingMall'
import Article from '../views/Article/Article'


Vue.use(VueRouter)

export default new VueRouter({
    linkExactActiveClass:'cur',
    routes:[
        {path:'/',redirect:'/home'},
        {path:'/home', component:Home},
        {path:'/mall',component:Mall},
        {path:'/play',component:Play},
        {path:'/match',component:Match},
        {path:'/data',component:Data},
        {path:'/add',component:Add},
        {path:'/forum',component:Forum},
        {path:'/category',component:Category},
        {path:'/shoppingCar',component:ShoppingCar},
        {path:'/shoppingMall',component:ShoppingMall},
        {path:'/articles/:id',component:Article},
    ]
})