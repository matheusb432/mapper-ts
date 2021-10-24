import { MapData } from './models/map-data';
/**
 * @version 1.1.0
 * @since 0.1.0
 *
 * @class Mapper class that can be instantiated and return a mapped object using map() as long as it's properly decorated
 * @property {destination} destination that will have the source data mapped to it
 * @property {mapData} mapData Object with all constructor data needed to map source to destination
 */
export declare class Mapper<TDestination> {
    destination: any;
    mapData: MapData;
    mappedKeys: string[];
    constructor(type: new (...args: any[]) => TDestination);
    /**
     * @version 1.1.0
     * @since 0.1.0
     *
     * Method to map the source object to the destination object
     * @function map
     * @param source The object to map
     * @returns A mapped object of the given type
     */
    map(source: {
        [x: string]: any;
    }): any;
    ignoreKeys(sourceData: {
        [x: string]: any;
    }): void;
    removeKey(source: {
        [x: string]: any;
    }, key: string): void;
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
    isIgnoredKey(key: string): boolean;
    shouldSkipMappedKey(key: string): boolean;
    isMappable(): boolean;
    isEmptySource(source: {
        [x: string]: any;
    }): boolean;
    private _getMapData;
}
