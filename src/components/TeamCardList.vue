

<template>
  <div id="teamCardList">
    <van-card
        v-for="team in teamList"
        :desc="team.description"
        :title="`${team.name} `"
        :thumb="teammate"
    >
      <template #tags >
        <van-tag plain type="primary"  style="margin-right: 8px;margin-top: 8px">
          {{teamStatusEnum[team.status]}}
        </van-tag>
      </template>
      <template #bottom>
        <div>
          {{`队伍人数：${team.hasJoinNum}/${team.maxNum}`}}
        </div>
        <div v-if="team.createTime">
          {{'队伍创建时间：'+team.createTime}}
        </div>
        <div v-if="team.expireTime">
          {{'队伍过期时间：'+team.expireTime}}
        </div>

      </template>
      <template #footer>
        <van-button v-if="currentuser?.id !== team.userId && !team.hasJoin" size="mini" type="primary" plain
                    @click="preJoinTeam(team)">加入队伍
                    </van-button>
        <van-button  v-if="team.userId === currentuser?.id"size="mini" type="success" plain
                     @click="doUpdateTeam(team.id)">更新队伍</van-button>
        <van-button  v-if="team.userId === currentuser?.id"size="mini" type="danger" plain
                     @click="doDeleteTeam(team.id)">解散队伍</van-button>
        <van-button  v-if="team.userId !== currentuser?.id && team.hasJoin"size="mini" type="success" plain
                     @click="doQuitTeam(team.id)">退出队伍</van-button>
      </template>
      {{currentuser}}
    </van-card>
    <van-dialog v-model:show="showPasswordDialog" title="请输入密码" show-cancel-button @confirm="doJoinTeam" @cancel="doCancel">
      <van-field v-model="password"  placeholder="请输入密码" />
    </van-dialog>

  </div>


</template>


<script setup lang="ts">
import {TeamType} from "../models/team";
import {teamStatusEnum} from "../constants/team.ts";
import teammate from "../assets/teammate.jpg"
import myaxios from "../plugins/my-axios.ts";
import {showFailToast, showSuccessToast} from "vant";
import {getCurrentUser} from "../services/getcurrentuser.ts";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
const showPasswordDialog = ref(false);
const password = ref('');
const joinTeamId = ref('');
const doCancel = ()=>{
  showPasswordDialog.value = false;
  password.value = '';
  joinTeamId.value = '';
}
const preJoinTeam = (team: TeamType) =>{
    joinTeamId.value = team.id;
    if(team.status === 0){
      doJoinTeam()
    }else{
      showPasswordDialog.value = true;
    }

  }

interface TeamCardListProps {
  teamList: TeamType[];
}
const props =  withDefaults(defineProps<TeamCardListProps>(),{
  teamList:[],
});
const currentuser = ref();
onMounted(async () =>{
  currentuser.value = await getCurrentUser();
})
/**
 * 加入队伍
 * @param id
 */
const doJoinTeam = async ()=>{
  if(!joinTeamId.value){
    return;
  }
  const res = await myaxios.post('/team/join',{
    teamId:joinTeamId.value,
    password:password.value,
  })
  if(res?.code === 0){
    showSuccessToast('加入成功');
  }else{
    showFailToast('加入失败,'+(res.description ? `${res.description}` :''));
  }
  }
const router = useRouter();
/**
 * 跳转至更新队伍
 * @param id
 */
const doUpdateTeam = async (id: number)=>{
  router.push({
    path: '/team/update/',
    query: {
      id,
    }
  });
}
const doDeleteTeam = async (id: number)=>{
  const res = await myaxios.get('/team/delete',{
    params:{
      id,
    }
  })
  if(res?.code === 0){
    showSuccessToast('解散成功');
  }else{
    showFailToast('解散失败,'+(res.description ? `${res.description}` :''));
  }
}
const doQuitTeam = async (id: number)=>{
  const res = await myaxios.post('/team/quit',{
    teamId:id
  })
  if(res?.code === 0){
    showSuccessToast('退出成功');
  }else{
    showFailToast('退出失败,'+(res.description ? `${res.description}` :''));
  }
}


</script>
<style scoped>
#teamCardList :deep(.van-image__img){
  object-fit: unset;
}
</style>