import { Maps } from './../models/maps.enum';
/**
 * @version 1.1.0
 * @since 0.1.0
 *
 * @function AddMap() decorator to apply to a property
 * @param sourceData Data that should contain one of or both of the property name and entity type to map
 * @returns An object with a new constructor property to allow for it's mapping with the Mapper class
 */
export function AddMap(
  ...sourceData: ((new (...args: any[]) => any) | string)[]
): (destination: any, key: string) => void {
  return (destination: any, key): void => {
    for (const data of sourceData) {
      if (typeof data === 'string') {
        addPropertyMap(destination, key, data);
      } else if (typeof data === 'function') {
        addObjectMap(destination, key, data);
      }
    }
  };
}

/**
 * @param sourceType property type of the object to be mapped
 */
function addObjectMap(destination: any, key: string, sourceType: object): void {
  if (!destination.constructor[Maps.Object]) {
    destination.constructor[Maps.Object] = {};
  }

  destination.constructor[Maps.Object][key] = sourceType;
}

/**
 * @param sourceName property name of the object to be mapped
 */
function addPropertyMap(destination: any, key: string, sourceName: string): void {
  if (!destination.constructor[Maps.Property]) {
    destination.constructor[Maps.Property] = {};
  }

  destination.constructor[Maps.Property][key] = sourceName;
}
