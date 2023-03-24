declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

declare interface PromiseFn<T = any, R = T> {
  (...arg: T[]): Promise<R>;
}

declare type TreeItem<T> = T & {
  children?: TreeItem<T>[];
};

declare type TreeList<T> = TreeItem<T>[];

declare type Nullable<T> = T | null;

declare type Arrayable<T> = T | T[];

declare type Awaitable<T> = Promise<T> | T;

declare type Recordable<T = any> = Record<string, T>;

declare type Functionable<T> = () => T | T;
