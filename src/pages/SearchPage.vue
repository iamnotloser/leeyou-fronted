
<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入要搜索的标签"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>
  <van-divider content-position="left">已选标签</van-divider>
  <div v-if="activeIds.length === 0">请选择标签</div>
  <van-row gutter="16" style="padding: 0 16px">
    <van-col v-for="tag in activeIds">
      <van-tag  closeable size="large" type="primary" @close="doclose(tag)">
        {{ tag }}
      </van-tag>
    </van-col>
  </van-row>
  <van-divider content-position="left">选择标签</van-divider>
  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="taglist"
  />
  <div style="padding: 20px">
    <van-button block type="primary" @click="doSearchResult"  >搜索</van-button>
  </div>

</template>
<script setup lang="ts">
import { ref } from 'vue';
import {useRouter} from "vue-router";
const router = useRouter();
const activeIds = ref([]);
const activeIndex = ref(0);
const originTaglist = [
  {
    text: '性别',
    children: [
      { text: '男', id: '男' },
      { text: '女', id: '女' },

    ],
  },
  {
    text: '方向',
    children: [
      { text: 'java', id: 'java' },
      { text: 'C++', id: 'C++' },
      { text: 'go', id: 'go' },
      { text: '前端', id: '前端' },

    ],
  },
  {
    text: '身份',
    children: [
      { text: '学生', id: '学生' },
      { text: '社畜', id: '社畜'},
      { text: '社畜', id: '社畜'},
      { text: '研一', id: '研一'},
      { text: '研二', id: '研二'},
      { text: '研三', id: '研三'},

    ],
  },{
    text: '状态',
    children: [
     { text: '已婚', id: '已婚' },
      { text: '单身', id: '单身' },
      { text: '有对象', id: '有对象' },
    ]
  }
]
let taglist = ref(originTaglist);

//移除标签
const doclose = (tag:string) => {
      activeIds.value = activeIds.value.filter(item =>{
        return item !== tag;
      })
    };
/**
 * 执行搜索后跳转页面
 */
const doSearchResult = () => {
  router.push({
    path: '/user/list',
    query: {
      tags: activeIds.value
    }
  })
}
const show = ref(true);
const close = () => {
      show.value = false;
    };
const searchText = ref('');
const onSearch = (val:string) => {
  taglist.value = originTaglist.map(parentTag => {
    const tempChildren = [...parentTag.children];
    const tempParentTag = { ...parentTag};
    tempParentTag.children = tempChildren
        .filter(childTag => childTag.text.includes(val));
    return tempParentTag;
  });
}
const onCancel = () => {
  searchText.value = '';
  taglist.value = originTaglist;
}

</script>

<style >

</style>
