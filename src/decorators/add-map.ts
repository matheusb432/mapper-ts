/**
 * @param sourceData data that should contain one of or both of the property name and entity type to map
 *
 * @returns an object with a new constructor property to allow for it's mapping with the Mapper class
 */
export function AddMap(
  ...sourceData: (Function | string)[]
): (destination: any, key: string) => void {
  return (destination: any, key): void => {
    for (const data of sourceData) {
      if (typeof data === 'string') {
        addPropertyMap(destination, key, data);
      } else if (typeof data === 'function') {
        addEntityMap(destination, key, data);
      }
    }
  };
}

/**
 * @param sourceType property type of the object to be mapped
 */
function addEntityMap(destination: any, key: string, sourceType: object): void {
  if (!destination.constructor.entityMap) {
    destination.constructor.entityMap = {};
  }
  destination.constructor.entityMap[key] = sourceType;
}

/**
 * @param sourceName property name of the object to be mapped
 */
function addPropertyMap(destination: any, key: string, sourceName: string): void {
  if (!destination.constructor.propertyMap) {
    destination.constructor.propertyMap = {};
  }
  destination.constructor.propertyMap[key] = sourceName;
}
