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
    { path: "/", title:"主页",component: Index },
    { path: "/team",title:"找队伍", component: Team },
    { path: "/user",title:"个人信息",component: UserPage},
    { path: "/search", title:"搜索用户",component: SearchPage},
    { path:"/user/edit",title:"修改信息页",component: UserEditPage},
    { path:"/user/list",title:"找队伍",component: SearchResultPage},
    { path:"/user/login",title:"用户登录",component: UserLoginPage},
    { path:"/team/add",title:"创建队伍",component: TeamAddPage},
    { path:"/team/update",title:"修改信息页",component: TeamUpdatePage},
    { path:"/user/update",title:"修改信息页",component: UserUpdatePage},
    { path:"/user/team/join",title:"参加的队伍",component: UserJoinTeamPage},
    { path:"/user/team/create",title:"创建的队伍",component: UserCreateTeamPage},


]

export default routes;