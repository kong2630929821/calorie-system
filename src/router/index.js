import Vue from 'vue';
import Router from 'vue-router';
import Details from  '../components/Details';
import GoodsList from '../components/GoodsList';
import Register from '../components/Register';
import Calorie from '../components/Calorie';
import MySelfSet from '../components/MySelfSet';
import Usermanagement from '../components/Usermanagement';
import Video from '../components/Video'
import Order from '../components/Order'
import Statistic from '../components/Statistic'
Vue.use(Router);

export default new Router({
  routes: [
    {
      path:'/login',
      name:'login',
      component:Register
    },
    {
      path:'/index',
      name:'index',
      component:Calorie,
      children:[
        {
          path:'Counts',
          name:'Counts',
          component:Statistic
        },
        {
          path:'Customs',
          name:'Customs',
          component:Usermanagement
        },
        {
          path:'Videos',
          name:'Videos',
          component:Video
        },
        {
          path:'Shops',
          name:'GoodsList',
          component:GoodsList,
        },
        {
          path: 'Details',
          name: 'Details',
          component: Details
        },
        {
          path:'Orders',
          name:'Orders',
          component:Order
        },
        {
          path:'NewPass',
          name:'NewPass',
          component:MySelfSet
        }
      ]
    },
    {
      path:'/',
      redirect:'/login'
    },
  ]
})
