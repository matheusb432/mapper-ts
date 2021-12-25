import { MapData, Maps } from './types';
/**
 * @version 1.1.3
 * @since 0.1.0
 *
 * @class Mapper class that can be instantiated and return a mapped object using map() as long as it's properly decorated
 * @property {destination} destination that will have the source data mapped to it
 * @property {mapData} mapData Object with all constructor data needed to map source to destination
 */
export class Mapper {
    constructor(type) {
        this.mappedKeys = [];
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
    map(source) {
        var _a;
        if (!this.isMappable() || Array.isArray(source))
            return source;
        if (this.isEmptySource(source))
            return null;
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
                const mappedKey = this.mapData.objectMaps[key];
                if (mappedKey) {
                    if (Array.isArray(this.destination[key])) {
                        this.destination[key] = this.destination[key].map((x) => new Mapper(mappedKey).map(x));
                    }
                    else {
                        this.destination[key] = new Mapper(mappedKey).map(this.destination[key]);
                    }
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
    isMappable(source) {
        var _a;
        return (_a = Object.values(this.mapData)) === null || _a === void 0 ? void 0 : _a.some((md) => md != null);
    }
    isEmptySource(source) {
        return source == null;
    }
    _getMapData() {
        const ctor = this.destination.constructor;
        return new MapData(ctor[Maps.Property], ctor[Maps.Object], ctor[Maps.Ignored]);
    }
    _initDestinationProps() {
        if (this.mapData.propertyMaps != null) {
            for (const prop of Object.keys(this.mapData.propertyMaps)) {
                this.destination[prop] = undefined;
            }
        }
    }
}
//# sourceMappingURL=mapper.js.map