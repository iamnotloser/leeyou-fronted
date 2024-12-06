

<template>
  <template v-if="user">
    <van-cell title="昵称" is-link to="/user/edit" :value="user.username" @click="toEdit('username', '昵称', user.username)" />
    <van-cell title="账号" is-link to="/user/edit" :value="user.userAccount " @click="toEdit('userAccount', '用户账号', user.userAccount)"/>
    <van-cell title="头像" is-link to="/user/edit" >
      <van-image :src="user.avatarUrl" width="45%" height="45%" />
    </van-cell>
    <van-cell title="性别" is-link  :value="user.gender" @click="toEdit('gender', '性别', user.gender)"  />
    <van-cell title="邮箱" is-link to="/user/edit" :value="user.email" @click="toEdit('email', '邮箱', user.email)" />
    <van-cell title="星球号码" :value="user.planetCode" />
    <van-cell title="创建时间" :value="user.createTime"/>
    <van-cell title="电话" is-link to="/user/edit" :value="user.phone" @click="toEdit('phone', '电话', user.phone)" />
  </template>



</template>
<script setup lang="ts">
import { useRouter} from "vue-router";
import {onMounted,ref} from "vue";
import {UserType} from "../models/user";
import qs from "qs";
import myaxios from "../plugins/my-axios.ts";
import {showFailToast, showSuccessToast} from "vant";
import {getCurrentUser} from "../services/getcurrentuser.ts";

// const user =  {
//   id: 1,
//   username: 'leeyou',
//   avatarUrl:'https://cdn.pixabay.com/photo/2021/11/12/03/04/woman-6787784_1280.png ',
//   userAccount: 'nhao',
//   email:' 16899986307@qq.com',
//   planetCode: '1233',
//   gender: '男',
//   createTime: new Date().toTimeString(),
//   phone: '12233444545',
// };
const user = ref();
const router = useRouter();
onMounted(async ()=> {
      user.value = await getCurrentUser();
    })

const toEdit = (editKey: string,editName: string,currentValue: string) => {
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      editName,
      currentValue,
    }
  })
};

</script>
<style scoped>

</style>