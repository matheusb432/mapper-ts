/**
 * @version 1.1.0
 * @since 0.1.0
 *
 * Mapping decorator to apply to a property
 * @function AddMap
 * @param sourceData Data that should contain one of or both of the property name and entity type to map
 * @returns An object with a new constructor property to allow for it's mapping with the Mapper class
 */
export declare function AddMap(...sourceData: ((new (...args: any[]) => any) | string)[]): (destination: any, key: string) => void;
