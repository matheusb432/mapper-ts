type ConstructorFunction<T> = new (...args: any[]) => T;

type SourceType = { [key: string]: any };

export { ConstructorFunction, SourceType };
