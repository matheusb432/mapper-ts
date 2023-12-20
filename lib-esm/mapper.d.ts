import { ConstructorFunction } from './types';
/**
 * @version 1.2.1
 * @since 0.1.0
 *
 * @class Mapper class that can be instantiated and return a mapped object using map() as long as it's properly decorated
 * @property {destination} destination that will have the source data mapped to it
 * @property {mapData} mapData Object with all constructor data needed to map source to destination
 * @property {mappedKeys} mappedKeys Array that keeps track of all prop keys that have already been mapped
 * @property {ctorType} ctorType Property that will hold the constructor function type of the destination object
 */
export declare class Mapper<TDestination> {
    private destination;
    private mapData;
    private mappedKeys;
    private ctorType;
    constructor(type: ConstructorFunction<TDestination>);
    map<TSource extends object>(source: TSource[]): TDestination[];
    map<TSource extends object>(source: TSource): TDestination;
    map<TSource extends object>(source: null): null;
    map<TSource extends object>(source: undefined): undefined;
    ignoreKeys<TSource extends object>(sourceData: TSource): void;
    removeKey<TSource extends object>(source: TSource, key: string): void;
    mapKeys<TSource extends object>(source: TSource): void;
    setMappedKeys<TSource extends object>(source: TSource): void;
    setUnmappedKeys<TSource extends object>(source: TSource): void;
    mapNestedObjects<TSource extends object>(): void;
    isIgnoredKey(key: string): boolean;
    shouldSkipMappedKey(key: string): boolean;
    hasAnyMapConfig(): boolean;
    private getMapData;
    private initDestinationProps;
}
