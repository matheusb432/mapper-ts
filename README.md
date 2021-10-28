# mapper-ts

- This package is a simple automapper where you can use decorators to map objects.

## Usage

```js

# importing modules
import { Mapper, AddMap, IgnoreMap } from 'mapper-ts/lib-esm';
```

## Examples

### Mapping properties in a class

```js
class AClass {
  `# Mapping a property by name`
  @AddMap('prop1B')
  prop1A: string;
  @AddMap('prop2B')
  prop2A: number;

  constructor(prop1A: string, prop2A: number) {
    this.prop1A = prop1A;
    this.prop2A = prop2A;
  }
}
```

```js
class BClass {
  @AddMap('prop1A')
  prop1B: string;
  @AddMap('prop2A')
  prop2B: number;

  `# Any properties that don't need to be mapped simply shouldn't have the @AddMap() decorator.`
  unmappedProp1B: number;
  unmappedProp2B: string;

  `# Mapping an object property by passing it's type`
  @AddMap(AClass)
  propAClass: AClass;
}
```

```js
`# Any property name in @IgnoreMap() will be ignored from the source object if it exists in it`
@IgnoreMap('ignoredObj', 'ignoredProp', 'nonexistantProp')
class CClass {
  @AddMap('prop1A')
  prop1C: string;
  @AddMap('prop2A')
  prop2C: number;

  `# Also valid if an object's property name also needs to be mapped`
  @AddMap(BClass, 'anyPropName')
  propBClass: BClass;
}
```

### Calling the Mapper.map() method

```js
const unmappedA = { prop1B: 'PROP 1B', prop2B: 10 };

const unmappedB = {
  prop1A: 'PROP 1B',
  prop2A: 10,
  unmappedProp1B: 20,
  unmappedProp2B: 'UNMAPPED 2B',
  propAClass:  { prop1B: 'PROP 1B in A', prop2B: 300 };
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


const mappedA = new Mapper(AClass).map(unmappedA);

const mappedB = new Mapper(BClass).map(unmappedB);

const mappedC = new Mapper(CClass).map(unmappedC);
```

```js
# Results:
AClass { prop1A: 'PROP 1B', prop2A: 10 }
BClass {
  prop1B: 'PROP 1B',
  prop2B: 10,
  unmappedProp1B: 20,
  unmappedProp2B: 'UNMAPPED 2B',
  propAClass: AClass { prop1A: 'PROP 1B in A', prop2A: 300 }
}
CClass {
  prop1C: 'PROP 1A',
  prop2C: 20,
  propBClass: BClass {
    prop1B: 'PROP 1A in C',
    prop2B: 20,
    unmappedProp1B: 20,
    unmappedProp2B: 'UNMAPPED 2B in C',
    propAClass: null
  }
}
```
