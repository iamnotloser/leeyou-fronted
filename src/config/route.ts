import Index from "../pages/Index.vue";
import Team from "../pages/Team.vue";
import User from "../pages/User.vue";
import SearchPage from "../pages/SearchPage.vue";
import UserEditPage from "../pages/UserEditPage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";



const routes = [
    { path: "/", component: Index },
    { path: "/team", component: Team },
    { path: "/user",component: User},
    { path: "/search", component: SearchPage},
    { path:"/user/edit",component: UserEditPage},
    { path:"/user/list",component: SearchResultPage},
    { path:"/user/login",component: UserLoginPage},

]

export default routes;