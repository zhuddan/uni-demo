type TabbarPages = '/pages/mine/index' | '/pages/mine/index';

export function useSwitchTab(url: TabbarPages) {
  uni.switchTab({
    url,
  });
}