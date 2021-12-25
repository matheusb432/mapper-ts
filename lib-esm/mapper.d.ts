import { MapData, SourceType, ConstructorFunction } from './types';
/**
 * @version 1.1.3
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
    constructor(type: ConstructorFunction<TDestination>);
    /**
     * @version 1.1.0
     * @since 0.1.0
     *
     * Method to map the source object to the destination object
     * @function map
     * @param source The object to map
     * @returns A mapped object of the given type
     */
    map(source: SourceType | SourceType[]): any;
    ignoreKeys(sourceData: SourceType): void;
    removeKey(source: SourceType, key: string): void;
    mapKeys(source: SourceType): void;
    setMappedKeys(source: SourceType): void;
    setUnmappedKeys(source: SourceType): void;
    mapNestedObjects(): void;
    isIgnoredKey(key: string): boolean;
    shouldSkipMappedKey(key: string): boolean;
    isMappable(source?: SourceType): boolean;
    isEmptySource(source: SourceType): boolean;
    private _getMapData;
    private _initDestinationProps;
}
