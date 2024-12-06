

<template>
  <template v-if="user">
    <van-cell title="当前用户" :value="user?.username" />
    <van-cell title="修改信息" is-link to="/user/update" />
    <van-cell title="我创建的队伍" is-link to="/user/team/create" />
    <van-cell title="我加入的队伍" is-link to="/user/team/join" />
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