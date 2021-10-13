/**
 * @param sourceData data that should contain one of or both of the property name and entity type to map
 *
 * @returns an object with a new constructor property to allow for it's mapping with the Mapper class
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
                addEntityMap(destination, key, data);
            }
        }
    };
}
/**
 * @param sourceType property type of the object to be mapped
 */
function addEntityMap(destination, key, sourceType) {
    if (!destination.constructor.entityMap) {
        destination.constructor.entityMap = {};
    }
    destination.constructor.entityMap[key] = sourceType;
}
/**
 * @param sourceName property name of the object to be mapped
 */
function addPropertyMap(destination, key, sourceName) {
    if (!destination.constructor.propertyMap) {
        destination.constructor.propertyMap = {};
    }
    destination.constructor.propertyMap[key] = sourceName;
}
//# sourceMappingURL=add-map.js.map