import { Maps } from './../models/maps.enum';
/**
 * @version 1.1.0
 * @since 0.1.0
 *
 * @function AddMap() decorator to apply to a property
 * @param sourceData Data that should contain one of or both of the property name and entity type to map
 * @returns An object with a new constructor property to allow for it's mapping with the Mapper class
 */
export function AddMap() {
    var sourceData = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sourceData[_i] = arguments[_i];
    }
    return function (destination, key) {
        for (var _i = 0, sourceData_1 = sourceData; _i < sourceData_1.length; _i++) {
            var data = sourceData_1[_i];
            if (typeof data === 'string') {
                addPropertyMap(destination, key, data);
            }
            else if (typeof data === 'function') {
                addObjectMap(destination, key, data);
            }
        }
    };
}
/**
 * @param sourceType property type of the object to be mapped
 */
function addObjectMap(destination, key, sourceType) {
    if (!destination.constructor[Maps.Object]) {
        destination.constructor[Maps.Object] = {};
    }
    destination.constructor[Maps.Object][key] = sourceType;
}
/**
 * @param sourceName property name of the object to be mapped
 */
function addPropertyMap(destination, key, sourceName) {
    if (!destination.constructor[Maps.Property]) {
        destination.constructor[Maps.Property] = {};
    }
    destination.constructor[Maps.Property][key] = sourceName;
}
//# sourceMappingURL=add-map.js.map