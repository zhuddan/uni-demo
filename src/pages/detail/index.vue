<script setup lang="ts">
import { useCounterStore } from '@/store/modules/counter';
import { useQuery } from '@/hooks/navigate/useQuery';
import { getCodeImg } from '@/api/login';
import { showActions, showModal } from '@/utils/ui';
import { useDicts } from '@/hooks/dict/useDict';
const counterStore = useCounterStore();
const { query } = useQuery({ t: 0 });
const { sys_normal_disable } = useDicts(['sys_normal_disable']);
function axiosTest() {
  showActions([
    '关关雎鸠',
    '在河之洲',
  ]).then(({ result }) => {
    console.log(result);
  });
  showModal('sd');
}

function handleGetCode() {
  getCodeImg().then((res) => {
    console.log(res);
  });
}
function aaa() {
  console.log('123');
}
handleGetCode();
const array = ['美国', '中国', '巴西', '日本'];
</script>

<template>
  <view class="content">
    <view>
      {{ counterStore.count }}=={{ query.t }}
    </view>

    <button>字典</button>
    <picker :range="array">
      <view class="picker">
        <button>字典</button>
      </view>
    </picker>
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
