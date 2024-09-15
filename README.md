# Lecture 2: Introduction to TypeScript

Topics:

- Primatives: JavaScript (JS) and TypeScript (TS)
- Type Annotations and Inference
- Type Aliases
- Functions
- Union Types
- Intersection Types
- Type Narrowing
- Interfaces
- Type Assertions
- Literal Types
- Generics

## Setup Lecture

Runing `lecture` will start a sandbox environment for copying and pasting code from README.md

```
npm install
npm run lecture
```

## Homework 2

Run the homework by running `npm run homework` and run the tests by running `npm run homework:test`. The goal is to fix all the TS errors in the code and make all the tests pass. When you run the tests, you will see a bunch of errors in the console.

## Resources

- TypeScript documentation: https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html
- TypeScript deep dive: https://basarat.gitbook.io/typescript
- TypeScript playground: https://www.typescriptlang.org/play

# Lecture 2 Notes

## Primatives

### JS Primatives

```ts
const message = "Hello World";
if (typeof message === "string") {
  // message is a string
}

const isLoading = false;
if (typeof isLoading === "boolean") {
  // isLoading is a boolean
}

const value = 10;
if (typeof value === "number") {
  // value is a number
}

const o = {};
if (typeof o === "object") {
  // n is an object`
}

const f = () => {};
if (typeof f === "function") {
  // f is a function
}

const u = undefined;
if (typeof u === "undefined") {
  // u is undefined
}

const n = null;
if (typeof n === "object") {
  // n is null
}

const s = Symbol("s");
if (typeof s === "symbol") {
  // s is a symbol
}

const bigInt = 10n;
if (typeof bigInt === "bigint") {
  // bigInt is a bigint
}
```

### TS Primatives

`any` is a type that can be any type.

```ts
let a: any;
a = "Hello World";
a = 10;
a = false;
a = {};
```

`unknown` is a type that can be any type, but it is not the same as `any`.

```ts
let u: unknown;
u = "Hello World";
u = 10;
u = false;
u = {};
```

Arrays `[]` or `Array<type>`

```ts
const names: string[] = ["Brandon", "Nico"];
const values: Array<number>[] = [1, 2, 3, 4, 5];
const truth: boolean[] = [true, false, true];
const nothing: any[] = [null, undefined];

// Error: Type 'boolean' is not assignable to type 'string'.
const cities: string[] = ["St. Louis", "Boston", true];
```

## Type Annotations and Type Inference

### Type Annotations

Type annotations are when you explicitly tell TypeScript the type of a variable.

```ts
let myName: string;
myName = "Brandon";

// Error: Type 'number' is not assignable to type 'string'.
myName = 100;
```

### Type Inference

Inference is when the TypeScript compiler infers the type of a variable based on the value assigned to it.

```ts
let myName = "Brandon"; // myName is inferred to be a string

// Error: Type 'string' is not assignable to type 'number'.
myName = 100;
```

### When to use Inference vs Annotations

Inference makes the code more concise and easier to read. Annotations are useful when the type is not immediately obvious or when you want to be more explicit about the type of a variable.

Annotations are useful when the type is not immediately obvious or when you want to be more explicit about the type of a variable.

```ts
// Inference
let person = {
  name: "Brandon",
  city: "Saint Louis",
};

// Error: Property 'state' does not exist on type '{ name: string; city: string; }'.
person.state = "MO";
```

```ts
// Annotations
let person: { name: string; city: string; state?: string } = {
  name: "Brandon",
  city: "Saint Louis",
};
person.state = "MO"; // 'state' is optional, so no error
```

## Type Aliases

Type aliases allow you to define a type that can be reused through codebase. Typing `{ name: string; city: string; state?: string }` is very verbose, so we can create a type alias for it.

```ts
type Person = {
  name: string;
  city: string;
  state?: string; // optional property
};
```

Type aliases can be used for anything

```ts
type GreetFunction = (p: Person) => string;
```

## Functions

Parameter type and return type annotations

```ts
const greet = (p: Person): string => {
  return `Hello ${p.name}, you live in ${p.city}`;
};

const person: Person = {
  name: "Brandon",
  city: "Saint Louis",
};

greet(person); // Hello Brandon, you live in Saint Louis

// Error: Argument of type 'number' is not assignable to parameter of type 'Person'.
greet(42);
```

Anonymous functions have contextual typing for parameters.

```ts
// Anonymous Functions
const people: Person[] = [
  { name: "Brandon", city: "Saint Louis" },
  { name: "Nico", city: "Boston" },
];

// Contextual typing for function - parameter p inferred to have type Person
people.forEach((p) => {
  // Error: 'p.state' is possibly 'undefined'
  p.state.toUpperCase();
});
```

## Union Types

Union types allow a value to be a set of types.

```ts
type GreetMessageParam = Person | string;
const greetMessage = (p: GreetMessageParam) => {
  // p is a Person | string
};

type GreetPeopleParam = Person[] | Person;
const greetPeople = (p: GreetPeopleParam) => {
  // p is a Person[] | Person
};
```

## Intersection Types

Intersection types allow you to combine multiple types into one.

```ts
type PersonWithId = Person & { id: number };
```

## Type Narrowing

`greetMessage` is a function that takes a `Person` or `string`, that means that inside the function `p` is of type `Person | string`. We need a way to narrow the type inside the function. First way to to add `typeof` type guards

```ts
const greetMessage = (p: Person | string) => {
  if (typeof p === "string") {
    // p is a string (VSCode will show type as 'string')
  } else {
    // p is a Person (VSCode will show type as 'Person')
  }
};
```

You can also use `Array.isArray` to narrow the type

```ts
const greetPeople = (p: Person[] | Person) => {
  if (Array.isArray(p)) {
    // p is an array (VSCode will show type as 'Person[]')
  } else {
    // p is a Person (VSCode will show type as 'Person')
  }
};
```

Sometimes you are dealing with two different type where `typeof` will not be able to distinguish between them. Here you can use `in` to narrow the type.

```ts
type Animal = {
  type: "cat" | "dog" | "bird";
  name: string;
};

const greetMessage = (p: Person | Animal) => {
  if ("type" in p) {
    // p is a Animal, Person doesn't have a type property
    return `Hello ${p.name}, you are a ${p.type}`;
  } else {
    // p is a Person, Animal doesn't have a city property
    return `Hello ${p.name}, you live in ${p.city}`;
  }
};

const greetAll = (people: (Person | Animal)[]) => people.map(greetMessage);

greetAll([
  { name: "Brandon", city: "Saint Louis" },
  { type: "cat", name: "Houdini" },
]); // [ 'Hello Brandon, you live in Saint Louis', 'Hello Houdini, you are a cat' ]
```

## Interfaces

Interfaces are similar to type aliases, but with different syntax

```ts
interface Person {
  name: string;
  city: string;
  state?: string;
}
```

Extending interfaces and type aliases

```ts
// Extending Interface
interface Employee extends Person {
  id: number;
  department: string;
}

// Extending Type Alias using intersection operator &
type Employee = Person & {
  id: number;
  department: string;
};
```

Difference between interfaces and type aliases is that interfaces can be re-opened to add new properties, whereas type aliases cannot be re-opened. This is a small difference, that we will probably not use often in this class. Feel free to use interfaces or types, however you like. Add new properties to an interface can be done like this:

```ts
interface Person {
  name: string;
  city: string;
  state?: string;
}

interface Person {
  id: number;
  department: string;
}

// Error: Type '{ id: number; department: string; }' is missing the following properties from type 'Person': name, city
const me: Person = {
  id: 1,
  department: "Software Development",
};
```

Adding a new properties to a type alias will throw an error

```ts
type Person = {
  name: string;
  city: string;
  state?: string;
};

// Error: Duplicate identifier 'Person'.
type Person = {
  id: number;
  department: string;
};
```

## Type Assertions

Sometimes you have information about a type of a value that TypeScript can't know about. This is where type assertion comes in, and you can use `as` to tell TypeScript what the type is.

```ts
const myCanvas = document.getElementById("main_canvas"); // type is 'HTMLElement | null'

// Error: Property 'getContext' does not exist on type 'HTMLElement'
myCanvas.getContext("2d");

// Type is 'HTMLCanvasElement'
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
myCanvas.getContext("2d");
```

You have to be careful with type assertions, because TS will not do any runtime checking to make sure you are correct. As a developer, you have to know that the type you asserting is correct. Generally you try to avoid using type assertions, but they are sometimes necessary like in the example above.

TS only allows type assertions which convert to more specific or less specific version of a type.

```ts
// Error: Conversion of type 'string' to type 'number' may be a mistake because neither type
//        sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
const x = "hello" as number;
```

## Literal Types

Literal types allow you to specify a set of allowed values for a type.

```ts
type Language = "English" | "Spanish" | "Farsi";

// Type is 'Language'
const lang: Language = "English";

// Error: Type '"Engdlish"' is not assignable to type 'Language'. Did you mean '"English"'?
const lang: Language = "Engdlish";

// Type is 'string'
const lang = "English";
```

Literal types can sometimes be tricky and you need to sometimes use `as` to get the type correct

```ts
interface Person {
  name: string;
  city: string;
  state?: string;

  primaryLanguage: Language;
}

const printLanguage = (p: Person) => {
  console.log(p.primaryLanguage);
};

// Type is '{ name: string; city: string; primaryLanguage: string; }'
const person = {
  name: "Brandon",
  city: "Saint Louis",
  primaryLanguage: "English",
};

// Error:  Argument of type '{ name: string; city: string; primaryLanguage: string; }' is not assignable to parameter of type 'Person'.
//          Types of property 'primaryLanguage' are incompatible.
//            Type 'string' is not assignable to type 'Language'.
printLanguage(person);
```

Correct way to fix this error is to assert primaryLanguage to be of type `Language`

```ts
// Type is { name: string; city: string; primaryLanguage: Language; }
const me = {
  name: "Brandon",
  city: "Saint Louis",
  primaryLanguage: "English" as Language,
};

printLanguage(me);
```

## Generics

Generics allow you to create reusable components that can work with multiple types.

```ts
const swap = (a: any, b: any) => {
  return [b, a];
};

const swapped = swap(1, 2);

// Type is any[]
const swapped = swap(1, 2);
```

We look at the type of `swapped` and it is `any[]`. We can do better than this. How about,

```ts
const swap = (a: number, b: number) => {
  return [b, a];
};

// Type is number[]
const swapped = swap(1, 2);
```

This is all good, but we want to be able to swap any two types. This is where generics come in.

```ts
const swap = <T, U>(a: T, b: U): [U, T] => {
  return [b, a];
};

// Type is [string, number]
const swapped = swap(1, "2");
```
