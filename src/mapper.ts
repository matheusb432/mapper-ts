import { MapData } from './models/map-data';
import { Maps } from './models/maps.enum';

/**
 * @version 1.1.2
 * @since 0.1.0
 *
 * @class Mapper class that can be instantiated and return a mapped object using map() as long as it's properly decorated
 * @property {destination} destination that will have the source data mapped to it
 * @property {mapData} mapData Object with all constructor data needed to map source to destination
 */
export class Mapper<TDestination> {
  destination: any;
  mapData: MapData;
  mappedKeys: string[] = [];

  constructor(type: new (...args: any[]) => TDestination) {
    this.destination = new type();

    this.mapData = this._getMapData();

    this._initDestinationProps();
  }

  /**
   * @version 1.1.0
   * @since 0.1.0
   *
   * Method to map the source object to the destination object
   * @function map
   * @param source The object to map
   * @returns A mapped object of the given type
   */
  map(source: { [x: string]: any }): any {
    if (!this.isMappable()) return source;

    if (this.isEmptySource(source)) return null;

    let sourceData;

    if (this.mapData.ignoredMaps?.length > 0) {
      sourceData = Object.assign({}, source);

      this.ignoreKeys(sourceData);
    }

    this.mapKeys(sourceData ?? source);

    this.mapNestedObjects();

    return this.destination;
  }

  ignoreKeys(sourceData: { [x: string]: any }) {
    for (const key of this.mapData.ignoredMaps) {
      this.removeKey(sourceData, key);
    }
  }

  removeKey(source: { [x: string]: any }, key: string): void {
    delete source[key];
  }

  mapKeys(source: { [x: string]: any }): void {
    if (this.mapData.propertyMaps != null) {
      this.setMappedKeys(source);
    }

    this.setUnmappedKeys(source);
  }

  setMappedKeys(source: { [x: string]: any }): void {
    Object.keys(this.destination).forEach((key) => {
      const mappedKey = this.mapData.propertyMaps[key];

      if (mappedKey) {
        this.mappedKeys.push(mappedKey);

        this.destination[key] = source[mappedKey];
      } else if (source[key] != null) {
        this.destination[key] = source[key];
      }
    });
  }

  setUnmappedKeys(source: { [x: string]: any }): void {
    if (this.mapData.propertyMaps != null) {
      let destinationKeys = Object.keys(this.destination);

      Object.keys(source).forEach((key) => {
        if (this.shouldSkipMappedKey(key)) {
          return;
        }

        if (!destinationKeys.includes(key)) {
          this.destination[key] = source[key];

          destinationKeys.push(key);
        }
      });
    } else {
      Object.keys(source).forEach((key) => {
        this.destination[key] = source[key];
      });
    }
  }

  mapNestedObjects(): void {
    if (this.mapData.objectMaps != null) {
      Object.keys(this.mapData.objectMaps).forEach((key) => {
        const mappedKey = this.mapData.objectMaps[key];
        if (mappedKey) {
          if (Array.isArray(this.destination[key])) {
            this.destination[key] = this.destination[key].map((x: { [x: string]: any }) =>
              new Mapper(mappedKey).map(x)
            );
          } else {
            this.destination[key] = new Mapper(mappedKey).map(this.destination[key]);
          }
        }
      });
    }
  }

  isIgnoredKey(key: string): boolean {
    return this.mapData.ignoredMaps?.includes(key);
  }

  shouldSkipMappedKey(key: string): boolean {
    return this.mappedKeys.includes(key);
  }

  isMappable(): boolean {
    return Object.values(this.mapData)?.some((md) => md != null);
  }

  isEmptySource(source: { [x: string]: any }): boolean {
    return source == null || source.length === 0;
  }

  private _getMapData() {
    const ctor = this.destination.constructor;

    return new MapData(ctor[Maps.Property], ctor[Maps.Object], ctor[Maps.Ignored]);
  }

  private _initDestinationProps(): void {
    if (this.mapData.propertyMaps != null) {
      for (const prop of Object.keys(this.mapData.propertyMaps)) {
        this.destination[prop] = undefined;
      }
    }
  }
}
