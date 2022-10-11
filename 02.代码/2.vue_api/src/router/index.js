import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/components/Home.vue'
import About from '@/components/About.vue'

Vue.use(VueRouter);

export default new VueRouter({
    mode:"history",
    routes:[
        {
            path:"/home",
            component:Home,
            meta:{
                isShow:true
            }
        },
        {
            path:"/about",
            component:About
        }
    ]
})