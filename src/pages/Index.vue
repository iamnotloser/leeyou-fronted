
<template>
  <user-card-list :user-list="userList"/>
  <van-empty v-if="!userList||userList.length<1" description="数据为空" />
</template>
<script setup lang="ts">
import {useRoute} from "vue-router";
import {onMounted, ref} from 'vue';
import myaxios from '../plugins/my-axios.ts'
import {UserType} from "../models/user";
import UserCardList from "../components/UserCardList.vue";

const route =useRoute();
const {tags} = route.query;

const userList = ref([]);
onMounted(async () => {
  const userListData:UserType[] = await myaxios.get('/user/recommend', {
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
  if(userListData){
    userListData.forEach((user) => {
      if(user.tags){
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
  console.log('userlistdata',userListData);
  console.log('userlist',userList);
})






</script>
<style scoped>

</style>