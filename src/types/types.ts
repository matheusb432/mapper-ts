type ConstructorFunction<T> = new (...args: any[]) => T;

type SourceType = Exclude<{ [key: string]: any }, Array<any>>;

export { ConstructorFunction, SourceType };
