import { Mapper, AddMap } from '../src';

class AClass {
  @AddMap('prop1B')
  prop1A: string;
  @AddMap('prop1B')
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

  constructor(prop1B: string, prop2B: number) {
    this.prop1B = prop1B;
    this.prop2B = prop2B;
  }
}

class CClass {
  @AddMap('prop1A')
  prop1C: string;
  @AddMap('prop2A')
  prop2C: number;

  @AddMap(BClass)
  propBClass: BClass;

  constructor(prop1C?: string, prop2C?: number, propBClass?: BClass) {
    this.prop1C = prop1C;
    this.prop2C = prop2C;
    this.propBClass = propBClass;
  }
}

const mappedA = new Mapper(AClass).map({ prop1B: 'PROP 1B', prop2B: 10 });

const mappedB = new Mapper(BClass).map({
  prop1A: 'PROP 1B',
  prop2A: 10,
  unmappedProp1B: 20,
  unmappedProp2B: 'UNMAPPED 2B',
});

const mappedC = new Mapper(CClass).map({
  prop1A: 'PROP 1A',
  prop2A: 20,
  propBClass: {
    prop1A: 'PROP 1A in C',
    prop2A: 20,
    unmappedProp1B: 20,
    unmappedProp2B: 'UNMAPPED 2B in C',
  },
});

console.log(mappedA);
console.log(mappedB);
console.log(mappedC);
