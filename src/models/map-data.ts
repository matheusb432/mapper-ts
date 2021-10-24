/**
 * @version 1.1.0
 * @since 1.1.0
 *
 * MapData class to store all constructor maps of a destination object
 * @class
 */
export class MapData {
  constructor(
    public propertyMaps: { [key: string]: string },
    public objectMaps: { [key: string]: new (...args: any[]) => any },
    public ignoredMaps: string[]
  ) {}
}
