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
  private destination: TDestination;
  private mapData: MapData;
  private mappedKeys: string[] = [];
  private ctorType: ConstructorFunction<TDestination>;

  constructor(type: ConstructorFunction<TDestination>) {
    this.ctorType = type;

    this.destination = new this.ctorType();

    this.mapData = this.getMapData();

    this.initDestinationProps();
  }

  map<TSource extends object>(source: TSource[]): TDestination[];
  map<TSource extends object>(source: TSource): TDestination;
  map<TSource extends object>(source: null): null;
  map<TSource extends object>(source: undefined): undefined;

  /**
   * @version 1.2.1
   * @since 0.1.0
   *
   * Method to map the source object to the destination object
   * @param source The object to map
   * @returns A mapped object of the given type
   */
  map<TSource extends object>(source: TSource | null | undefined) {
    if (Array.isArray(source)) {
      return source.map((sourceObj) =>
        new Mapper(this.ctorType).map(sourceObj)
      ) as TDestination[];
    }

    if (source && !this.hasAnyMapConfig()) {
      this.setUnmappedKeys(source);

      return this.destination;
    }

    if (!source) return source;

    let sourceData: TSource;

    if (this.mapData.ignoredMaps?.length > 0) {
      sourceData = Object.assign({}, source);

      this.ignoreKeys(sourceData);
    }

    this.mapKeys(sourceData ?? source);

    this.mapNestedObjects();

    return this.destination;
  }

  ignoreKeys<TSource extends object>(sourceData: TSource) {
    for (const key of this.mapData.ignoredMaps) {
      this.removeKey(sourceData, key);
    }
  }

  removeKey<TSource extends object>(source: TSource, key: string): void {
    delete source[key];
  }

  mapKeys<TSource extends object>(source: TSource): void {
    if (this.mapData.propertyMaps != null) {
      this.setMappedKeys(source);
    }

    this.setUnmappedKeys(source);
  }

  setMappedKeys<TSource extends object>(source: TSource): void {
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

  setUnmappedKeys<TSource extends object>(source: TSource): void {
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

  mapNestedObjects<TSource extends object>(): void {
    if (this.mapData.objectMaps != null) {
      Object.keys(this.mapData.objectMaps).forEach((key) => {
        const classType = this.mapData.objectMaps[key];

        if (!classType) return;

        if (Array.isArray(this.destination[key])) {
          this.destination[key] = this.destination[key].map((destPropObj: TSource) =>
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

  hasAnyMapConfig(): boolean {
    return (
      this.mapData.propertyMaps != null ||
      this.mapData.objectMaps != null ||
      this.mapData.ignoredMaps != null
    );
  }

  private getMapData() {
    const ctor = this.destination.constructor;

    return new MapData(ctor[Maps.Property], ctor[Maps.Object], ctor[Maps.Ignored]);
  }

  private initDestinationProps(): void {
    if (this.mapData.propertyMaps != null) {
      for (const prop of Object.keys(this.mapData.propertyMaps)) {
        this.destination[prop] = undefined;
      }
    }
  }
}
