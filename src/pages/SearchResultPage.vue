

<template>
  <user-card-list :user-list="userList"/>
  <van-empty v-if="!userList||userList.length<1" description="暂无查询到结果" />


</template>
<script setup lang="ts">
import {useRoute} from "vue-router";
import {onMounted, ref} from 'vue';
import myaxios from '../plugins/my-axios.ts'
import qs from 'qs';
import UserCardList from "../components/UserCardList.vue";

const route =useRoute();
const {tags} = route.query;
const userList = ref([]);

onMounted(async () => {
  const userListData= await myaxios.get('/user/search/tags', {
    params: {
      taglist: tags
    },
    paramsSerializer: function (params) {
      return qs.stringify(params, {arrayFormat: 'repeat'})
    }
  })
      .then(function (response) {
        console.log('/user/search/tags succeed', response);
        return response?.data;

      })
      .catch(function (error) {
        console.error('/user/search/tags error', error);
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