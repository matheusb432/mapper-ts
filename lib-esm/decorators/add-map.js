import { Maps } from '../types/maps.enum';
/**
 * @version 1.1.3
 * @since 0.1.0
 *
 * Mapping decorator to apply to a property
 * @function AddMap
 * @param sourceData Data that should contain one of or both of the property name and entity type to map
 * @returns An object with a new constructor property to allow for it's mapping with the Mapper class
 */
export function AddMap(...sourceData) {
    return (destination, key) => {
        for (const data of sourceData) {
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