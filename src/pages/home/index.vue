<script setup lang="ts">
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { useCounterStore } from '../../store/modules/counter';
const title = ref('Hello');

const counterStore = useCounterStore();
onLoad((options) => {
  console.log(options);
});

function go() {
  const t = Date.now();
  uni.navigateTo({
    url: `../detail/index?t=${t}`,
    fail(result) {
      console.log(result);
    },
  });
}
</script>

<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title">
        {{ title }} == {{ counterStore.count }}
      </text>
    </view>
    <button @click="counterStore.add()">
      add
    </button>
    <button @click="go">
      click
    </button>
  </view>
</template>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin: 200rpx auto 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
