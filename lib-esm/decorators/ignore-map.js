import { Maps } from './../models/maps.enum';
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
export function IgnoreMap() {
    var ignoredMap = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        ignoredMap[_i] = arguments[_i];
    }
    return function (classCtor) {
        classCtor[Maps.Ignored] = ignoredMap;
    };
}
//# sourceMappingURL=ignore-map.js.map