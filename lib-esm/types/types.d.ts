declare type ConstructorFunction<T> = new (...args: any[]) => T;
declare type SourceType = {
    [key: string]: any;
};
export { ConstructorFunction, SourceType };
