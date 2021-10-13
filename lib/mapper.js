"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mapper = void 0;
/**
 * @class Mapper class that can be instantiated and return a mapped object using map() as long as it's properly decorated
 * @property {propertyMapping} -- data with all properties that need name mapping from source to destination
 * @property {entityMapping} -- data with all properties that need type mapping from source to destination
 * @property {destination} -- property that will have the source data mapped to it
 */
var Mapper = /** @class */ (function () {
    function Mapper(type) {
        this.mappedKeys = [];
        this.destination = new type();
        this.propertyMapping = this.destination.constructor.propertyMap;
        this.entityMapping = this.destination.constructor.entityMap;
    }
    /**
     * map() function to map the source object to the destination object
     * @param source The object to map
     * @returns A mapped object of the given type
     */
    Mapper.prototype.map = function (source) {
        if (!this.isMappable())
            return source;
        if (this.isEmptySource(source))
            return null;
        this.mapKeys(source);
        this.mapNestedObjects();
        return this.destination;
    };
    Mapper.prototype.mapKeys = function (source) {
        if (this.propertyMapping != null) {
            this.setMappedKeys(source);
        }
        this.setUnmappedKeys(source);
    };
    Mapper.prototype.setMappedKeys = function (source) {
        var _this = this;
        Object.keys(this.destination).forEach(function (key) {
            var mappedKey = _this.propertyMapping[key];
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
        if (this.propertyMapping != null) {
            Object.keys(source).forEach(function (key) {
                if (_this.shouldSkipMappedKey(key)) {
                    return;
                }
                var destinationKeys = Object.keys(_this.destination);
                if (!destinationKeys.includes(key)) {
                    _this.destination[key] = source[key];
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
        if (this.entityMapping != null) {
            Object.keys(this.entityMapping).forEach(function (key) {
                var mappedKey = _this.entityMapping[key];
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
    Mapper.prototype.shouldSkipMappedKey = function (key) {
        return this.mappedKeys.includes(key);
    };
    Mapper.prototype.isMappable = function () {
        return this.propertyMapping != null || this.entityMapping != null;
    };
    Mapper.prototype.isEmptySource = function (source) {
        return source == null || source.length === 0;
    };
    return Mapper;
}());
exports.Mapper = Mapper;
//# sourceMappingURL=mapper.js.map