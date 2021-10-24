import { MapData } from './models/map-data';
import { Maps } from './models/maps.enum';
/**
 * @version 1.1.0
 * @since 0.1.0
 *
 * @class Mapper class that can be instantiated and return a mapped object using map() as long as it's properly decorated
 * @property {destination} destination that will have the source data mapped to it
 * @property {mapData} mapData Object with all constructor data needed to map source to destination
 */
var Mapper = /** @class */ (function () {
    function Mapper(type) {
        this.mappedKeys = [];
        this.destination = new type();
        this.mapData = this._getMapData();
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
    Mapper.prototype.map = function (source) {
        var _a;
        if (!this.isMappable())
            return source;
        if (this.isEmptySource(source))
            return null;
        var sourceData;
        if (((_a = this.mapData.ignoredMaps) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            sourceData = Object.assign({}, source);
            this.ignoreKeys(sourceData);
        }
        this.mapKeys(sourceData !== null && sourceData !== void 0 ? sourceData : source);
        this.mapNestedObjects();
        return this.destination;
    };
    Mapper.prototype.ignoreKeys = function (sourceData) {
        for (var _i = 0, _a = this.mapData.ignoredMaps; _i < _a.length; _i++) {
            var key = _a[_i];
            this.removeKey(sourceData, key);
        }
    };
    Mapper.prototype.removeKey = function (source, key) {
        delete source[key];
    };
    Mapper.prototype.mapKeys = function (source) {
        if (this.mapData.propertyMaps != null) {
            this.setMappedKeys(source);
        }
        this.setUnmappedKeys(source);
    };
    Mapper.prototype.setMappedKeys = function (source) {
        var _this = this;
        Object.keys(this.destination).forEach(function (key) {
            var mappedKey = _this.mapData.propertyMaps[key];
            if (mappedKey) {
                _this.mappedKeys.push(mappedKey);
                _this.destination[key] = source[mappedKey];
            }
            else if (source[key] != null) {
                _this.destination[key] = source[key];
            }
        });
    };
    Mapper.prototype.setUnmappedKeys = function (source) {
        var _this = this;
        if (this.mapData.propertyMaps != null) {
            var destinationKeys_1 = Object.keys(this.destination);
            Object.keys(source).forEach(function (key) {
                if (_this.shouldSkipMappedKey(key)) {
                    return;
                }
                if (!destinationKeys_1.includes(key)) {
                    _this.destination[key] = source[key];
                    destinationKeys_1.push(key);
                }
            });
        }
        else {
            Object.keys(source).forEach(function (key) {
                _this.destination[key] = source[key];
            });
        }
    };
    Mapper.prototype.mapNestedObjects = function () {
        var _this = this;
        if (this.mapData.objectMaps != null) {
            Object.keys(this.mapData.objectMaps).forEach(function (key) {
                var mappedKey = _this.mapData.objectMaps[key];
                if (mappedKey) {
                    if (Array.isArray(_this.destination[key])) {
                        _this.destination[key] = _this.destination[key].map(function (x) {
                            return new Mapper(mappedKey).map(x);
                        });
                    }
                    else {
                        _this.destination[key] = new Mapper(mappedKey).map(_this.destination[key]);
                    }
                }
            });
        }
    };
    Mapper.prototype.isIgnoredKey = function (key) {
        var _a;
        return (_a = this.mapData.ignoredMaps) === null || _a === void 0 ? void 0 : _a.includes(key);
    };
    Mapper.prototype.shouldSkipMappedKey = function (key) {
        return this.mappedKeys.includes(key);
    };
    Mapper.prototype.isMappable = function () {
        var _a;
        return (_a = Object.values(this.mapData)) === null || _a === void 0 ? void 0 : _a.some(function (md) { return md != null; });
    };
    Mapper.prototype.isEmptySource = function (source) {
        return source == null || source.length === 0;
    };
    Mapper.prototype._getMapData = function () {
        var ctor = this.destination.constructor;
        return new MapData(ctor[Maps.Property], ctor[Maps.Object], ctor[Maps.Ignored]);
    };
    return Mapper;
}());
export { Mapper };
//# sourceMappingURL=mapper.js.map