# mapper-ts

- This package is a simple automapper where you can use decorators to map objects.

## Installation

```js
# using npm
npm install mapper-ts

# using yarn
yarn add mapper-ts
```

## Usage

```js

# importing modules
import { Mapper, AddMap } from 'mapper-ts/lib-esm';
```

## Example

### Mapping properties in a class

```js
class BClass {
  `# Mapping a property by name`
  @AddMap('prop1A')
  prop1B: string;
  @AddMap('prop2A')
  prop2B: number;

  `# Any properties that don't need to be mapped simply shouldn't have the @AddMap() decorator.`
  unmappedProp1B: number;
  unmappedProp2B: string;

  `# Properties need to be initialized, even if their initial value can be null / undefined`
  constructor(prop1B: string, prop2B?: number) {
    this.prop1B = prop1B;
    this.prop2B = prop2B;
  }
}
```

```js
class CClass {
  @AddMap('prop1A')
  prop1C: string;
  @AddMap('prop2A')
  prop2C: number;

  `# Mapping an object property by passing it's type`
  @AddMap(BClass)
  propBClass: BClass;

  `# Also valid if an object property's name also needs to be mapped`
  @AddMap('anyPropName',BClass)
  propBClass: BClass;

  constructor(prop1C?: string, prop2C?: number, propBClass?: BClass) {
    this.prop1C = prop1C;
    this.prop2C = prop2C;
    this.propBClass = propBClass;
  }
}
```

### Calling the Mapper.map() method

```js
const mappedB = new Mapper(BClass).map({
  prop1A: 'PROP 1B',
  prop2A: 10,
  unmappedProp1B: 20,
  unmappedProp2B: 'UNMAPPED 2B',
});

const mappedC = new Mapper(CClass).map({
  prop1A: 'PROP 1A',
  prop2A: 20,
  propBClass: { prop1A: 'PROP 1A in C', prop2A: 20 },
});
```

```js
# Results:
mappedB = BClass {
  prop1B: 'PROP 1B',
  prop2B: 10,
  unmappedProp1B: 20,
  unmappedProp2B: 'UNMAPPED 2B'
}

mappedC = CClass {
  prop1C: 'PROP 1A',
  prop2C: 20,
  propBClass: {
    prop1A: 'PROP 1A in C',
    prop2A: 20,
    unmappedProp1B: 20,
    unmappedProp2B: 'UNMAPPED 2B in C',
  },
}
```
