interface Window {
  webkitRequestAnimationFrame: Fn<FrameRequestCallback, number>;
  mozRequestAnimationFrame: Fn<FrameRequestCallback, number>;
  process: any;
}

declare type TargetContext = '_self' | '_blank';

declare interface VEvent extends Event {
  target: HTMLInputElement;
}

declare type IntervalHandle = ReturnType<typeof setInterval>;

declare type TimeoutHandle = ReturnType<typeof setTimeout>;

declare const __APP_API_URL__: string;

declare const __APP_MODE__: string;

declare const __DEV__: boolean;

declare const __PROD__: boolean;
