import VueRouter from "vue-router"
import Register from "@/components/Register";
import Home from "@/components/Home";
import AddModule from "@/components/AddModule";

export default new VueRouter({
    mode:"history",
    routes:[
        {
            path:"/login",
            component:Register
        },
        {
            path: "/",
            component: Home
        },
        {
            path: "/add",
            component: AddModule
        }

    ]


})