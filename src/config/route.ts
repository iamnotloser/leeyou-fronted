import Index from "../pages/Index.vue";
import Team from "../pages/Team.vue";
import SearchPage from "../pages/SearchPage.vue";
import UserEditPage from "../pages/UserEditPage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";
import TeamAddPage from "../pages/TeamAddPage.vue";
import TeamUpdatePage from "../pages/TeamUpdatePage.vue";
import UserPage from "../pages/UserPage.vue";
import UserUpdatePage from "../pages/UserUpdatePage.vue";
import UserJoinTeamPage from "../pages/UserJoinTeamPage.vue";
import UserCreateTeamPage from "../pages/UserCreateTeamPage.vue";


const routes = [
    { path: "/", component: Index },
    { path: "/team", component: Team },
    { path: "/user",component: UserPage},
    { path: "/search", component: SearchPage},
    { path:"/user/edit",component: UserEditPage},
    { path:"/user/list",component: SearchResultPage},
    { path:"/user/login",component: UserLoginPage},
    { path:"/team/add",component: TeamAddPage},
    { path:"/team/update",component: TeamUpdatePage},
    { path:"/user/update",component: UserUpdatePage},
    { path:"/user/team/join",component: UserJoinTeamPage},
    { path:"/user/team/create",component: UserCreateTeamPage},


]

export default routes;