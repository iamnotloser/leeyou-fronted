

<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userAccount"
          name="用户账号"
          label="用户账号"
          placeholder="用户账号"
          :rules="[{ required: true, message: '请填写用户账号' }]"
      />
      <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>

</template>
<script setup lang="ts">
import { useRouter} from "vue-router";
import {onMounted,ref} from "vue";
import {UserType} from "../models/user";
import qs from "qs";
import myaxios from "../plugins/my-axios.ts";
import {showFailToast, showSuccessToast, Toast} from "vant";


const router = useRouter();
const userAccount = ref('');
const password = ref('');
const onSubmit = async (values) => {
  const res = await myaxios.post('/user/login',{
    'userAccount':userAccount.value,
    'password':password.value
  })
  console.log(res,'用户登录');
  if(res.code === 0&&res.data){
    router.replace('/');
    showSuccessToast('登录成功');
  }else{
    showFailToast('用户名或密码错误');
  }
};


</script>
<style scoped>

</style>