/**
 * @version 1.1.0
 * @since 1.1.0
 *
 * MapData class to store all constructor maps of a destination object
 * @class
 */
export declare class MapData {
    propertyMaps: {
        [key: string]: string;
    };
    objectMaps: {
        [key: string]: new (...args: any[]) => any;
    };
    ignoredMaps: string[];
    constructor(propertyMaps: {
        [key: string]: string;
    }, objectMaps: {
        [key: string]: new (...args: any[]) => any;
    }, ignoredMaps: string[]);
}
