/**
 * @version 1.1.0
 * @since 1.1.0
 *
 * Class decorator to ignore any properties contained in it's parameters.
 * @function IgnoreMap
 * @param ignoredMap Source object properties that will be ignored to prevent their mapping to
 * the destination object.
 * @returns A modified class constructor with an added ignoredMap array of properties to ignore
 */
export declare function IgnoreMap(...ignoredMap: string[]): (classCtor: any) => void;
