/**
 * @class Mapper class that can be instantiated and return a mapped object using map() as long as it's properly decorated
 * @property {propertyMapping} -- data with all properties that need name mapping from source to destination
 * @property {entityMapping} -- data with all properties that need type mapping from source to destination
 * @property {destination} -- property that will have the source data mapped to it
 */
export declare class Mapper<TDestination> {
    propertyMapping: any;
    entityMapping: any;
    destination: any;
    mappedKeys: string[];
    constructor(type: new (...args: any[]) => TDestination);
    /**
     * map() function to map the source object to the destination object
     * @param source The object to map
     * @returns A mapped object of the given type
     */
    map(source: {
        [x: string]: any;
    }): any;
    mapKeys(source: {
        [x: string]: any;
    }): void;
    setMappedKeys(source: {
        [x: string]: any;
    }): void;
    setUnmappedKeys(source: {
        [x: string]: any;
    }): void;
    mapNestedObjects(): void;
    shouldSkipMappedKey(key: string): boolean;
    isMappable(): boolean;
    isEmptySource(source: {
        [x: string]: any;
    }): boolean;
}
