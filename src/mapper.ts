import { MapData, Maps, SourceType, ConstructorFunction } from './types';

/**
 * @version 1.2.1
 * @since 0.1.0
 *
 * @class Mapper class that can be instantiated and return a mapped object using map() as long as it's properly decorated
 * @property {destination} destination that will have the source data mapped to it
 * @property {mapData} mapData Object with all constructor data needed to map source to destination
 * @property {mappedKeys} mappedKeys Array that keeps track of all prop keys that have already been mapped
 * @property {ctorType} ctorType Property that will hold the constructor function type of the destination object
 */
export class Mapper<TDestination> {
  destination: TDestination;
  mapData: MapData;
  mappedKeys: string[] = [];
  ctorType: ConstructorFunction<TDestination>;

  constructor(type: ConstructorFunction<TDestination>) {
    this.ctorType = type;

    this.destination = new this.ctorType();

    this.mapData = this._getMapData();

    this._initDestinationProps();
  }

  /**
   * @version 1.2.1
   * @since 0.1.0
   *
   * Method to map the source object to the destination object
   * @param source The object to map
   * @returns A mapped object of the given type
   */
  map(source: SourceType | SourceType[]): TDestination | TDestination[] | SourceType {
    if (Array.isArray(source)) {
      return source.map((sourceObj) =>
        new Mapper(this.ctorType).map(sourceObj)
      ) as TDestination[];
    }

    if (source && !this.isMappable()) {
      this.setUnmappedKeys(source);

      return this.destination;
    }

    if (!source) return source;

    let sourceData: SourceType;

    if (this.mapData.ignoredMaps?.length > 0) {
      sourceData = Object.assign({}, source);

      this.ignoreKeys(sourceData);
    }

    this.mapKeys(sourceData ?? source);

    this.mapNestedObjects();

    return this.destination;
  }

  ignoreKeys(sourceData: SourceType) {
    for (const key of this.mapData.ignoredMaps) {
      this.removeKey(sourceData, key);
    }
  }

  removeKey(source: SourceType, key: string): void {
    delete source[key];
  }

  mapKeys(source: SourceType): void {
    if (this.mapData.propertyMaps != null) {
      this.setMappedKeys(source);
    }

    this.setUnmappedKeys(source);
  }

  setMappedKeys(source: SourceType): void {
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

  setUnmappedKeys(source: SourceType): void {
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
        const classType = this.mapData.objectMaps[key];

        if (!classType) return;

        if (Array.isArray(this.destination[key])) {
          this.destination[key] = this.destination[key].map((destPropObj: SourceType) =>
            new Mapper(classType).map(destPropObj)
          );
        } else {
          this.destination[key] = new Mapper(classType).map(this.destination[key]);
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
