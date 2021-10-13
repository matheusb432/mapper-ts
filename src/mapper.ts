/**
 * @class Mapper class that can be instantiated and return a mapped object using map() as long as it's properly decorated
 * @property {propertyMapping} -- data with all properties that need name mapping from source to destination
 * @property {entityMapping} -- data with all properties that need type mapping from source to destination
 * @property {destination} -- property that will have the source data mapped to it
 */
export class Mapper<TDestination> {
  propertyMapping: any;
  entityMapping: any;
  destination: any;
  mappedKeys: string[] = [];

  constructor(type: new (...args: any[]) => TDestination) {
    this.destination = new type();
    this.propertyMapping = this.destination.constructor.propertyMap;
    this.entityMapping = this.destination.constructor.entityMap;
  }

  /**
   * map() function to map the source object to the destination object
   * @param source The object to map
   * @returns A mapped object of the given type
   */
  map(source: { [x: string]: any }): any {
    if (!this.isMappable()) return source;

    if (this.isEmptySource(source)) return null;

    this.mapKeys(source);

    this.mapNestedObjects();

    return this.destination;
  }

  mapKeys(source: { [x: string]: any }): void {
    if (this.propertyMapping != null) {
      this.setMappedKeys(source);
    }
    this.setUnmappedKeys(source);
  }

  setMappedKeys(source: { [x: string]: any }): void {
    Object.keys(this.destination).forEach((key) => {
      const mappedKey = this.propertyMapping[key];

      if (mappedKey) {
        this.mappedKeys.push(mappedKey);
        this.destination[key] = source[mappedKey];
      } else if (source[key] != null) {
        this.destination[key] = source[key];
      }
    });
  }

  setUnmappedKeys(source: { [x: string]: any }): void {
    if (this.propertyMapping != null) {
      Object.keys(source).forEach((key) => {
        if (this.shouldSkipMappedKey(key)) {
          return;
        }
        const destinationKeys = Object.keys(this.destination);

        if (!destinationKeys.includes(key)) {
          this.destination[key] = source[key];
        }
      });
    } else {
      Object.keys(source).forEach((key) => {
        this.destination[key] = source[key];
      });
    }
  }

  mapNestedObjects(): void {
    if (this.entityMapping != null) {
      Object.keys(this.entityMapping).forEach((key) => {
        const mappedKey = this.entityMapping[key];
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

  shouldSkipMappedKey(key: string): boolean {
    return this.mappedKeys.includes(key);
  }

  isMappable(): boolean {
    return this.propertyMapping != null || this.entityMapping != null;
  }

  isEmptySource(source: { [x: string]: any }): boolean {
    return source == null || source.length === 0;
  }
}
