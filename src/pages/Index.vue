
<template>
  <van-cell center title="心动模式">
    <template #right-icon>
      <van-switch v-model="isMatchMode" />
    </template>
  </van-cell>
  <user-card-list :user-list="userList" :loading="loading"/>
  <van-empty v-if="!userList||userList.length<1" description="数据为空" />
</template>
<script setup lang="ts">
import {useRoute} from "vue-router";
import {ref, watchEffect} from 'vue';
import myaxios from '../plugins/my-axios.ts'
import {UserType} from "../models/user";
import UserCardList from "../components/UserCardList.vue";

const route =useRoute();
const {tags} = route.query;
const isMatchMode = ref<boolean>(false)
const userList = ref([]);
const loading = ref(true);



const loadData = async () => {
  let userListData;
  loading.value = true;
  if(isMatchMode.value){
    const num = 10;
     userListData = await myaxios.get('/user/match', {
      params: {
        num,
      },
    })
        .then(function (response) {
          console.log('/user/match succeed', response);
          return response?.data;
        })
        .catch(function (error) {
          console.error('/user/match error', error);
        })

  }else{
      userListData = await myaxios.get('/user/recommend', {
      params: {
        pagesize: 8,
        pagenum: 1,
      },
    })
        .then(function (response) {
          console.log('/user/recommend succeed', response);
          return response?.data?.records;
        })
        .catch(function (error) {
          console.error('/user/recommend error', error);
        })
  }
  if(userListData){
    userListData.forEach((user:UserType) => {
      if(user.tags){
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
  loading.value = false;
  console.log('userlistdata',userListData);
  console.log('userlist',userList);

}
watchEffect(()=>{
  loadData();
});

</script>
<style scoped>

</style>