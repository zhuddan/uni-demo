import type { ComputedRef, Ref, PropType as VuePropType } from 'vue';

declare global{

  declare type PropType<T> = VuePropType<T>;

  declare type EmitType = (event: string, ...args: any[]) => void;

  declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;

  declare type MaybeRef<T> = T | Ref<T> ;

  declare type MaybeComputedRef<T> = MaybeReadonlyRef<T> | MaybeRef<T>;

  declare type MaybeReadonlyRef<T> = (() => T) | ComputedRef<T>;

  declare type MaybeRecordRef<T> = {
    [P in keyof T]: MaybeRef<T[P]>;
  };

  declare type RecordRef<T> = {
    [P in keyof T]: Ref<T[P]>;
  };
}
