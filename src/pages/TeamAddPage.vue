

<template>
  <div id="teamaddpage">

    <van-form @submit="duSubmit">
      <van-cell-group inset>
        <van-field
            v-model="addTeamData.name"
            name="name"
            label="队伍名称"
            placeholder="请输入队伍名"
            :rules="[{ required: true, message: '请填写队伍名' }]"
        />
        <van-field
            v-model="addTeamData.description"
            rows="1"
            autosize
            label="队伍描述"
            type="textarea"
            placeholder="请输入队伍详情"
        />
        <van-field
            v-model="addTeamData.expireTime"
            is-link
            readonly
            name="datePicker"
            label="时间选择"
            placeholder="点击选择时间"
            @click="showPicker = true"

        />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-date-picker

              type="datetime"
              :min-date="new Date()"
              title="请选择过期时间"
              @confirm="onConfirm" @cancel="showPicker = false" />
        </van-popup>
        <van-field name="stepper" label="最大人数"  >
          <template #input>
            <van-stepper v-model="addTeamData.maxNum" max="10" min="2"/>
          </template>
        </van-field>
        <van-field name="radio" label="队伍状态">
          <template #input>
            <van-radio-group v-model="addTeamData.status" direction="horizontal">
              <van-radio name="0">公开</van-radio>
              <van-radio name="2">加密</van-radio>
              <van-radio name="1">私有</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field v-if="addTeamData.status === '2'"
            v-model="addTeamData.password"
            type="password"
            name="password"
            label="密码"
            placeholder="请输入队伍密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />


      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>

</template>


<script setup lang="ts">
import {ref} from "vue";
import myaxios from "../plugins/my-axios.ts";
import {showFailToast, showSuccessToast} from "vant";
import {useRouter} from "vue-router";
import moment from "moment";
const initFormData = {

  "description": "",
  "expireTime": [],
  "maxNum": 3,
  "name": "",
  "password": "",
  "status": 0,

}
const addTeamData = ref({...initFormData})
const router = useRouter();


const showPicker = ref(false);
const onConfirm = ({ selectedValues }) => {
  addTeamData.value.expireTime = selectedValues.join('-');
  showPicker.value = false;
};
const duSubmit = async () => {
 const postData = {
   ...addTeamData.value,
   status: Number(addTeamData.value.status),
   expireTime:moment(addTeamData.value.expireTime).format('YYYY-MM-DD'),
 }
  const res = await myaxios.post('/team/add',postData);
  if(res?.code === 0 && res?.data) {
     showSuccessToast("创建成功");
     router.push({
       path: '/team',
       replace: true,
     })
   }else{
     showFailToast("创建失败");
   }
  console.log(addTeamData.value)

}
</script>
<style scoped>

</style>
