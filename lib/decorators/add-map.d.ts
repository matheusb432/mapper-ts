/**
 * @param sourceData data that should contain one of or both of the property name and entity type to map
 *
 * @returns an object with a new constructor property to allow for it's mapping with the Mapper class
 */
export declare function AddMap(...sourceData: (Function | string)[]): (destination: any, key: string) => void;
