import { MapData, Maps } from './types';
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
export class Mapper {
    constructor(type) {
        this.mappedKeys = [];
        this.ctorType = type;
        this.destination = new this.ctorType();
        this.mapData = this.getMapData();
        this.initDestinationProps();
    }
    /**
     * @version 1.2.1
     * @since 0.1.0
     *
     * Method to map the source object to the destination object
     * @param source The object to map
     * @returns A mapped object of the given type
     */
    map(source) {
        var _a;
        if (Array.isArray(source)) {
            return source.map((sourceObj) => new Mapper(this.ctorType).map(sourceObj));
        }
        if (source && !this.hasAnyMapConfig()) {
            this.setUnmappedKeys(source);
            return this.destination;
        }
        if (!source)
            return source;
        let sourceData;
        if (((_a = this.mapData.ignoredMaps) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            sourceData = Object.assign({}, source);
            this.ignoreKeys(sourceData);
        }
        this.mapKeys(sourceData !== null && sourceData !== void 0 ? sourceData : source);
        this.mapNestedObjects();
        return this.destination;
    }
    ignoreKeys(sourceData) {
        for (const key of this.mapData.ignoredMaps) {
            this.removeKey(sourceData, key);
        }
    }
    removeKey(source, key) {
        delete source[key];
    }
    mapKeys(source) {
        if (this.mapData.propertyMaps != null) {
            this.setMappedKeys(source);
        }
        this.setUnmappedKeys(source);
    }
    setMappedKeys(source) {
        Object.keys(this.destination).forEach((key) => {
            const mappedKey = this.mapData.propertyMaps[key];
            if (mappedKey) {
                this.mappedKeys.push(mappedKey);
                this.destination[key] = source[mappedKey];
            }
            else if (source[key] != null) {
                this.destination[key] = source[key];
            }
        });
    }
    setUnmappedKeys(source) {
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
        }
        else {
            Object.keys(source).forEach((key) => {
                this.destination[key] = source[key];
            });
        }
    }
    mapNestedObjects() {
        if (this.mapData.objectMaps != null) {
            Object.keys(this.mapData.objectMaps).forEach((key) => {
                const classType = this.mapData.objectMaps[key];
                if (!classType)
                    return;
                if (Array.isArray(this.destination[key])) {
                    this.destination[key] = this.destination[key].map((destPropObj) => new Mapper(classType).map(destPropObj));
                }
                else {
                    this.destination[key] = new Mapper(classType).map(this.destination[key]);
                }
            });
        }
    }
    isIgnoredKey(key) {
        var _a;
        return (_a = this.mapData.ignoredMaps) === null || _a === void 0 ? void 0 : _a.includes(key);
    }
    shouldSkipMappedKey(key) {
        return this.mappedKeys.includes(key);
    }
    hasAnyMapConfig() {
        return (this.mapData.propertyMaps != null ||
            this.mapData.objectMaps != null ||
            this.mapData.ignoredMaps != null);
    }
    getMapData() {
        const ctor = this.destination.constructor;
        return new MapData(ctor[Maps.Property], ctor[Maps.Object], ctor[Maps.Ignored]);
    }
    initDestinationProps() {
        if (this.mapData.propertyMaps != null) {
            for (const prop of Object.keys(this.mapData.propertyMaps)) {
                this.destination[prop] = undefined;
            }
        }
    }
}
//# sourceMappingURL=mapper.js.map