# TypeScript

> JavaScript is the worst language, except for all the others

## When should I use TypeScript?
Any time you care about your project, or anytime your project will have > 1 developer

## _Why_ should I use TypeScript?
**Speed**
- Detect errors early
- Fewer tests
- Simpler tests
- Fewer bugs & regression errors
- Greater ease of discovery
- Better IDE tooling (auto-complete/auto-suggest/intellisense/refactoring)
- You get some decent benefits for free: type inference, 
ES6 syntax (`import`/`export`, `for-in`, `for-of`, `class`, `get`, `set`, `async`/`await`)
- The "cost" of including TypeScript in your project and making use of the type system is a miniscule price to pay in exchange for not needing to maintain an entire mental model of your application, months later. With types, your code is: self-describing, simpler, predictable, testable, readable



## `public` / `private` access modifiers
`public` - (default) accessible everywhere  
`private` - only accessible within the declaring class  
`protected` - only accessible within the class and subclass
```
class Foo {
    x: number;
    private y: number;
    protected z: number;

    bar() { }

    private baz() { }
}
```

## Generics

```
type LinkedList<T> = T & {
  next: LinkedList<T>
};

interface Person {
    name: string;
}

let people: LinkedList<Person>;
let s = people.name;
s = people.next.name;
s = people.next.next.name;
s = people.next.next.next.name;
```

## Tagged Unions
```
interface Cash {
  kind: "cash";
}

interface PayPal {
  kind: "paypal";
  email: string;
}

interface CreditCard {
  kind: "credit";
  cardIssuer: string;
}

type PaymentMethod = Cash | PayPal | CreditCard;

function describePaymentMethod(method: PaymentMethod) {
  switch (method.kind) {
    case "cash":
      // Here, method has type Cash
      return "Cash";

    case "paypal":
      // Here, method has type PayPal
      return `PayPal (${method.email})`;

    case "credit":
      // Here, method has type CreditCard
      return `Credit card (${method.cardIssuer})`;
  }
}
```

## Sugar

### Type inference
```
const number = 3 // type: number
const numbers = [1,2,3] // type: number[]
```

```
let number;
number = 3;
```

### Constructor Field Assignment
Instead of:
```
class TestClass {
  private foo: string;
  public bar: number;

  constructor(foo: string, bar: number) {
    this.foo = foo;
    this.bar = bar;
  }
}
```

TypeScript provides the following syntax
```
class TestClass {
  constructor(private foo: string,
              public bar: number) { }
}
```

### Numeric separators

Within a numeric literal, underscores are ignored
```
const oneMillion = 1_000_000; // compiles to 1000000
```

### `keyof`

Does this look familiar?
```
interface Student {
    id: number,
    name: string,
    grade: number,
}

function getProperty(obj, key) {
    return obj[key];
}

getProperty(student, 'id'); // How do we know the return type? Is 'id' even a property of this object?
```

`keyof` extrapolates the keys of a type and maps to a string union representing those keys:

```
function getProperty<T>(obj: T, key: keyof T) {
    return obj[key];
}

getProperty(student, 'id'); // number
getProperty(student, 'name'); // string
getProperty(student, 'age'); // Argument of type '"age"' is not assignable to parameter of type '"id" | "name" | "grade"'.
```


### `Readonly<T>`

```
interface Student {
    id: number,
    name: string,
    grade: number;
}

type ReadonlyStudent = Readonly<Student>;
// {
//     readonly id: number,
//     readonly name: string,
//     readonly grade: number;
// }

function updateStudent(student: Readonly<Student>) {
  ...
}
```


### `Partial<T>`

```
interface Student {
    id: number,
    name: string,
    grade: number;
}

type PartialStudent = Partial<Student>;
// {
//     id?: number,
//     name?: string,
//     grade?: number;
// }

function setState(state: Partial<Student>) {
  ...
}
```

### `Pick<T, K extends keyof T>`
From a type `T`, derive a new type with the subset of keys `K`
```
interface Student {
    id: number,
    name: string,
    grade: number;
}

const anonymousStudent = _.pick(student, ['id', 'grade'])
// {
//     id: number,
//     grade: number;
// }

console.log(anonymousStudent.name); // Error!
```


## API Safety


### Generate your Swagger Spec from TypeScript
https://www.npmjs.com/package/typescript-rest-swagger

### Generate Types from a Swagger Spec
https://www.npmjs.com/package/swagger-typescript-codegen