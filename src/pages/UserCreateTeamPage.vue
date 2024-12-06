

<template>
  <van-search
      v-model="searchText"
      placeholder="请搜索队伍"
      input-align="center"
      @search="onSearch"
  />
  <team-card-list :team-list="teamList"/>
  <van-empty v-if="!teamList||teamList.length<1" description="数据为空" />

  <div id="teampage">
    <van-button type="primary" @click="doJoinTeam" icon-position="right">创建队伍</van-button>
  </div>
</template>


<script setup lang="ts">
import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myaxios from "../plugins/my-axios.ts";
import {showFailToast, showSuccessToast} from "vant";

const teamList = ref([]);
const router = useRouter();
const searchText = ref('');

const doJoinTeam = () => {
  router.push('/team/add')
  console.log("doJoinTeam")
}
const listTeam = async (val ='') => {
  const res = await myaxios.get('/team/list/my',{
    params:{
      searchText:val
    }
  })
  if(res?.code === 0){
    showSuccessToast("获取数据成功")
    teamList.value = res.data;
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

</style>
