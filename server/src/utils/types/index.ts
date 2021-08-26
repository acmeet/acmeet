export type KeyOf<T extends object> = keyof T;
export type ValueOf<T extends object> = T[keyof T];