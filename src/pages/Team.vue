

<template>
  <div id="teampage">
    <van-search
      v-model="searchText"
      placeholder="请搜索队伍"
      input-align="center"
      @search="onSearch"/>
    <div style="margin-bottom: 16px" />
    <van-button class="add-button" icon="plus" type="primary" @click="doJoinTeam" />
    <van-tabs v-model:active="active" @change="onTabChange">
      <van-tab title="公开队伍" name="public">{{ searchText }}</van-tab>
      <van-tab title="加密队伍" name="private"/>

    </van-tabs>
    <team-card-list :team-list="teamList" :myJoinTeamList="myJoinTeamList" />
    <van-empty v-if="!teamList||teamList.length<1" description="数据为空" />

  </div>

</template>


<script setup lang="ts">
import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";

import {onMounted, ref} from "vue";
import myaxios from "../plugins/my-axios.ts";
import {TeamType} from "../models/team";
import {showFailToast, showSuccessToast} from "vant";
import { showToast } from 'vant';
const teamList = ref([]);
const router = useRouter();
const searchText = ref('');
const myJoinTeamList = ref([]);
const active = ref('public');
const onTabChange = (name)=>{
  if(name==='public'){
    listTeam(searchText.value ,0);
  }else{
    listTeam(searchText.value,2);
    console.log(searchText);
  }
}
const doJoinTeam = () => {
  router.push('/team/add')
  console.log("doJoinTeam")
}
const listTeam = async (val = '',status = 0) => {
  const res = await myaxios.get('/team/list',{
    params:{
      searchText: val,
      status,
    }
  })
  if(res?.code === 0){
    showSuccessToast("获取数据成功")
    teamList.value = res.data;
  }else{
    showFailToast("获取数据失败");
  }
}
/**
 * 搜索我加入的队伍
 * @param val
 */
const listMyJoinTeam = async (val ='') => {
  const res = await myaxios.get('/team/list/my/join',{
    params:{
      searchText:val
    }
  })
  if(res?.code === 0){
    showSuccessToast("获取数据成功")
    myJoinTeamList.value = res.data;
  }else{
    showFailToast("获取数据失败");
  }
}

onMounted( ()=> {
  listTeam();
})
const onSearch = (val)=> {
  listTeam(val);
};
</script>
<style scoped>
#teampage{

}
</style>
