var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { AddMap, IgnoreMap, Mapper } from '../';
describe('mapper', () => {
    describe('map', () => {
        it('should map AClass correctly', () => {
            const unmappedA = { prop1B: 'PROP 1B', prop2B: 10 };
            const mappedA = new Mapper(AClass).map(unmappedA);
            expect(mappedA).toBeInstanceOf(AClass);
            expect(mappedA.prop1A).toBe('PROP 1B');
            expect(mappedA.prop2A).toBe(10);
        });
        it('should map BClass correctly', () => {
            const unmappedB = {
                prop1A: 'PROP 1B',
                prop2A: 10,
                unmappedProp1B: 20,
                unmappedProp2B: 'UNMAPPED 2B',
                propAClass: { prop1B: 'PROP 1B in A', prop2B: 300 },
            };
            const mappedB = new Mapper(BClass).map(unmappedB);
            expect(mappedB).toBeInstanceOf(BClass);
            expect(mappedB.prop1B).toBe('PROP 1B');
            expect(mappedB.prop2B).toBe(10);
            expect(mappedB.unmappedProp1B).toBe(20);
            expect(mappedB.unmappedProp2B).toBe('UNMAPPED 2B');
            expect(mappedB.propAClass).toBeInstanceOf(AClass);
            expect(mappedB.propAClass.prop1A).toBe('PROP 1B in A');
            expect(mappedB.propAClass.prop2A).toBe(300);
        });
        it('should map CClass correctly', () => {
            const unmappedC = {
                prop1A: 'PROP 1A',
                prop2A: 20,
                anyPropName: {
                    prop1A: 'PROP 1A in C',
                    prop2A: 20,
                    unmappedProp1B: 20,
                    unmappedProp2B: 'UNMAPPED 2B in C',
                },
                ignoredObj: {
                    ignoredProp1: 'IGNORED PROP in obj',
                    ignoredProp2: 'IGNORED PROP in obj2',
                },
                ignoredProp: 'IGNORED PROP',
            };
            const mappedC = new Mapper(CClass).map(unmappedC);
            expect(mappedC).toBeInstanceOf(CClass);
            expect(mappedC.prop1C).toBe('PROP 1A');
            expect(mappedC.prop2C).toBe(20);
            expect(mappedC.propBClass).toBeInstanceOf(BClass);
            expect(mappedC.propBClass.prop1B).toBe('PROP 1A in C');
            expect(mappedC.propBClass.prop2B).toBe(20);
            expect(mappedC.propBClass.unmappedProp1B).toBe(20);
            expect(mappedC.propBClass.unmappedProp2B).toBe('UNMAPPED 2B in C');
            expect(mappedC.hasOwnProperty('ignoredObj')).toBe(false);
            expect(mappedC.hasOwnProperty('ignoredProp')).toBe(false);
        });
        const unmappedD = {
            mapMe1: 'hey',
            mapMe2: 10,
            cClassInD: {
                prop1A: 'PROP 1A',
                prop2A: 20,
                anyPropName: {
                    prop1A: 'PROP 1A in C',
                    prop2A: 20,
                    unmappedProp1B: 20,
                    unmappedProp2B: 'UNMAPPED 2B in C',
                },
                ignoredObj: {
                    ignoredProp1: 'IGNORED PROP in obj',
                    ignoredProp2: 'IGNORED PROP in obj2',
                },
                ignoredProp: 'IGNORED PROP',
            },
            propBDList: [
                {
                    prop1A: 'PROP 1B',
                    prop2A: 10,
                    unmappedProp1B: 20,
                    unmappedProp2B: 'UNMAPPED 2B',
                    propAClass: { prop1B: 'PROP 1B in A 1', prop2B: 300 },
                },
                {
                    prop1A: 'different value',
                    prop2A: 10,
                    unmappedProp1B: 'changed unmapped prop',
                    unmappedProp2B: 'UNMAPPED 2B',
                    propAClass: { prop1B: 'PROP 1B in A 2', prop2B: 350 },
                },
                {
                    prop1A: 'PROP 1B',
                    prop2A: 150,
                    unmappedProp1B: 20,
                    unmappedProp2B: 'other changed unmapped prop',
                    propAClass: { prop1B: 'PROP 1B in A 3', prop2B: 0 },
                },
            ],
        };
        it('should map DClass correctly', () => {
            const mappedD = new Mapper(DClass).map(unmappedD);
            expect(mappedD).toBeInstanceOf(DClass);
            expect(mappedD.prop1D).toBe('hey');
            expect(mappedD.prop2D).toBe(10);
            expect(mappedD.propCD).toBeInstanceOf(CClass);
            expect(mappedD.propCD.prop1C).toBe('PROP 1A');
            expect(mappedD.propCD.prop2C).toBe(20);
            expect(mappedD.propCD.propBClass.prop1B).toBe('PROP 1A in C');
            expect(mappedD.propCD.propBClass.prop2B).toBe(20);
            expect(mappedD.propCD.propBClass.unmappedProp1B).toBe(20);
            expect(mappedD.propCD.propBClass.unmappedProp2B).toBe('UNMAPPED 2B in C');
            expect(mappedD.propCD.hasOwnProperty('ignoredObj')).toBe(false);
            expect(mappedD.propCD.hasOwnProperty('ignoredProp')).toBe(false);
            expect(mappedD.propBDList).toBeInstanceOf(Array);
            expect(mappedD.propBDList[0]).toBeInstanceOf(BClass);
            expect(mappedD.propBDList.length).toBe(3);
            expect(mappedD.propBDList[0].prop1B).toBe('PROP 1B');
            expect(mappedD.propBDList[0].prop2B).toBe(10);
            expect(mappedD.propBDList[0].unmappedProp1B).toBe(20);
            expect(mappedD.propBDList[0].unmappedProp2B).toBe('UNMAPPED 2B');
            expect(mappedD.propBDList[0].propAClass.prop1A).toBe('PROP 1B in A 1');
            expect(mappedD.propBDList[0].propAClass.prop2A).toBe(300);
            expect(mappedD.propBDList[1].prop1B).toBe('different value');
            expect(mappedD.propBDList[1].prop2B).toBe(10);
            expect(mappedD.propBDList[1].unmappedProp1B).toBe('changed unmapped prop');
            expect(mappedD.propBDList[1].unmappedProp2B).toBe('UNMAPPED 2B');
            expect(mappedD.propBDList[1].propAClass.prop1A).toBe('PROP 1B in A 2');
            expect(mappedD.propBDList[1].propAClass.prop2A).toBe(350);
            expect(mappedD.propBDList[2].prop1B).toBe('PROP 1B');
            expect(mappedD.propBDList[2].prop2B).toBe(150);
            expect(mappedD.propBDList[2].unmappedProp1B).toBe(20);
            expect(mappedD.propBDList[2].unmappedProp2B).toBe('other changed unmapped prop');
            expect(mappedD.propBDList[2].propAClass.prop1A).toBe('PROP 1B in A 3');
            expect(mappedD.propBDList[2].propAClass.prop2A).toBe(0);
        });
        it('should map an array of values correctly', () => {
            const unmappedAList = [
                { prop1B: 'PROP 1B', prop2B: 10 },
                { prop1B: 'PROP 1B 2', prop2B: 20 },
            ];
            const mappedAList = new Mapper(AClass).map(unmappedAList);
            expect(mappedAList).toBeInstanceOf(Array);
            expect(mappedAList[0]).toBeInstanceOf(AClass);
            expect(mappedAList[0].prop1A).toBe('PROP 1B');
            expect(mappedAList[0].prop2A).toBe(10);
            expect(mappedAList[1].prop1A).toBe('PROP 1B 2');
            expect(mappedAList[1].prop2A).toBe(20);
        });
        it('should not mutate the source object', () => {
            const unmappedDClone = JSON.parse(JSON.stringify(unmappedD));
            const mappedD = new Mapper(DClass).map(unmappedD);
            expect(unmappedD).toEqual(unmappedDClone);
            expect(mappedD).not.toEqual(unmappedDClone);
            expect(mappedD).toBeInstanceOf(DClass);
        });
        it('should return an object of the class type for EClass', () => {
            const unmappedE = { prop1E: 'prop1E value', prop2E: 'prop2E value', prop3E: 33 };
            const mappedE = new Mapper(EClass).map(unmappedE);
            expect(mappedE).toBeInstanceOf(EClass);
            expect(mappedE.prop1E).toBe('prop1E value');
            expect(mappedE.prop2E).toBe('prop2E value');
            expect(mappedE.prop3E).toBe(33);
        });
        it('should not map falsy values', () => {
            const instance = new Mapper(AClass).map(null);
            const instance2 = new Mapper(AClass).map(undefined);
            const instance3 = new Mapper(AClass).map(0);
            expect(instance).toBe(instance);
            expect(instance2).toBe(instance2);
            expect(instance3).toBe(instance3);
        });
    });
    describe('IgnoreMap', () => {
        it('should ignore specified properties', () => {
            const instance = new Mapper(BClass).map({
                prop1A: 'test',
                prop2A: 123,
                unmappedProp1B: 123,
                unmappedProp2B: 'test',
                ignoredProp: 'test',
            });
            expect(instance.hasOwnProperty('ignoredProp')).toBe(false);
            expect(instance.hasOwnProperty('unmappedProp1B')).toBe(true);
            expect(instance.hasOwnProperty('unmappedProp2B')).toBe(true);
        });
    });
    describe('hasAnyMapConfig', () => {
        class MappableClassA {
        }
        __decorate([
            AddMap('unmappedProp1')
        ], MappableClassA.prototype, "prop1", void 0);
        __decorate([
            AddMap('unmappedProp2')
        ], MappableClassA.prototype, "prop2", void 0);
        let MappableClassB = class MappableClassB {
        };
        MappableClassB = __decorate([
            IgnoreMap('ignoredProp')
        ], MappableClassB);
        class UnmappableClass {
        }
        it('should return true if class has any map configuration', () => {
            const mapperA = new Mapper(MappableClassA);
            const mapperB = new Mapper(MappableClassB);
            expect(mapperA.hasAnyMapConfig()).toBe(true);
            expect(mapperB.hasAnyMapConfig()).toBe(true);
        });
        it('should return false if class does not have any map configuration', () => {
            const mapper = new Mapper(UnmappableClass);
            const result = mapper.hasAnyMapConfig();
            expect(result).toBe(false);
        });
    });
});
class AClass {
    constructor(prop1A, prop2A) {
        this.prop1A = prop1A;
        this.prop2A = prop2A;
    }
}
__decorate([
    AddMap('prop1B')
], AClass.prototype, "prop1A", void 0);
__decorate([
    AddMap('prop2B')
], AClass.prototype, "prop2A", void 0);
let BClass = class BClass {
};
__decorate([
    AddMap('prop1A')
], BClass.prototype, "prop1B", void 0);
__decorate([
    AddMap('prop2A')
], BClass.prototype, "prop2B", void 0);
__decorate([
    AddMap(AClass)
], BClass.prototype, "propAClass", void 0);
BClass = __decorate([
    IgnoreMap('ignoredProp')
], BClass);
let CClass = class CClass {
};
__decorate([
    AddMap('prop1A')
], CClass.prototype, "prop1C", void 0);
__decorate([
    AddMap('prop2A')
], CClass.prototype, "prop2C", void 0);
__decorate([
    AddMap(BClass, 'anyPropName')
], CClass.prototype, "propBClass", void 0);
CClass = __decorate([
    IgnoreMap('ignoredObj', 'ignoredProp', 'nonexistantProp')
], CClass);
class DClass {
}
__decorate([
    AddMap('mapMe1')
], DClass.prototype, "prop1D", void 0);
__decorate([
    AddMap('mapMe2')
], DClass.prototype, "prop2D", void 0);
__decorate([
    AddMap('mapMe3')
], DClass.prototype, "prop3D", void 0);
__decorate([
    AddMap('mapMe4')
], DClass.prototype, "prop4D", void 0);
__decorate([
    AddMap(CClass, 'cClassInD')
], DClass.prototype, "propCD", void 0);
__decorate([
    AddMap(BClass)
], DClass.prototype, "propBDList", void 0);
class EClass {
}
//# sourceMappingURL=mapper.test.js.map