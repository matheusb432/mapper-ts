import { Mapper, AddMap, IgnoreMap } from '../src';

class AClass {
  @AddMap('prop1B')
  prop1A: string;
  @AddMap('prop2B')
  prop2A: number;

  constructor(prop1A: string, prop2A: number) {
    this.prop1A = prop1A;
    this.prop2A = prop2A;
  }
}

class BClass {
  @AddMap('prop1A')
  prop1B: string;
  @AddMap('prop2A')
  prop2B: number;

  unmappedProp1B: number;
  unmappedProp2B: string;

  @AddMap(AClass)
  propAClass: AClass;
}

@IgnoreMap('ignoredObj', 'ignoredProp', 'nonexistantProp')
class CClass {
  @AddMap('prop1A')
  prop1C: string;
  @AddMap('prop2A')
  prop2C: number;

  @AddMap(BClass, 'anyPropName')
  propBClass: BClass;
}

class DClass {
  @AddMap('mapMe1')
  prop1D: string;
  @AddMap('mapMe2')
  prop2D: number;
  @AddMap('mapMe3')
  prop3D: string;
  @AddMap('mapMe4')
  prop4D: number;

  @AddMap(CClass, 'cClassInD')
  propCD: CClass;

  @AddMap(BClass)
  propBDList: BClass[];
}

// ? Unmapped classes when mapped just return the source object.
class EClass {
  prop1E: string;
  prop2E: string;
  prop3E: number;
}

const unmappedA = { prop1B: 'PROP 1B', prop2B: 10 };

const unmappedB = {
  prop1A: 'PROP 1B',
  prop2A: 10,
  unmappedProp1B: 20,
  unmappedProp2B: 'UNMAPPED 2B',
  propAClass: { prop1B: 'PROP 1B in A', prop2B: 300 },
};
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

const unmappedD = {
  mapMe1: 'hey',
  mapMe2: 10,
  cClassInD: unmappedC,
  propBDList: [
    unmappedB,
    { ...unmappedB, prop1A: 'different value', unmappedProp1B: 'changed unmapped prop' },
    { ...unmappedB, prop2A: 150, unmappedProp2B: 'other changed unmapped prop' },
  ],
};

const unmappedE = {
  prop1E: 'prop1E value',
  prop2E: 'prop2E value',
  prop3E: 33,
};

const mappedA = new Mapper(AClass).map(unmappedA);
const mappedB = new Mapper(BClass).map(unmappedB);
const mappedC = new Mapper(CClass).map(unmappedC);
const mappedD = new Mapper(DClass).map(unmappedD);
const mappedE = new Mapper(EClass).map(unmappedE);

[mappedA, mappedB, mappedC, mappedD, mappedE].forEach((mappedObject) => console.log(mappedObject));
