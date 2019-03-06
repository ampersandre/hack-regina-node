# [Getters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get)
Sometimes it is desirable to allow access to a property that returns a dynamically computed value, or you may want to reflect the status of an internal variable without requiring the use of explicit method calls.

- It must have exactly zero parameters
- It must not appear with another `get` or with a field for the same property (`{ get x() { }, get x() { } }` and `{ x: 'foo', get x() { } }` are forbidden)

```
class Rectangle {
  height = 0; width = 0;
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }

  get area() {
    return this.height * this.width;
  }
}

const r = new Rectangle(10, 5);
console.log(r.area); // 50
```

# [Setters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set)
A `setter` can be used to execute a function whenever a specified property is attempted to be changed.

- It must have exactly one parameter
- It must not appear in an object literal with another `set` or with a field for the same property
(`{ set x(v) { }, set x(v) { } }` and `{ x: 'foo', set x(v) { } }` are forbidden )

```
class Language {
  log = [];
  currentLanguage = '';

  set current(lang) {
    this.currentLanguage = lang;
    this.log.push(lang);
  }
  get current() {
    return this.currentLanguage;
  }
}

const language = new Language();
language.current = 'EN';
language.current = 'FR';

console.log(language.current); // 'FR'
console.log(language.log); // ['EN', 'FR']
```



# [Computed Property Names](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names)
Allows you to put an expression in brackets [], that will be computed and used as a property key
```
const param = 'size';

const config1 = {
  id: 123,
  param: 17,
  original_param: 12,
};

console.log(config1); // { id: 123, param: 12, original_param: 12 }

// Now with [computed property names]
const config2 = {
  id: 123,
  [param]: 17,
  [`original_${param}`]: 12,
};

console.log(config2); // { id: 123, size: 12, original_size: 12 }
```



# [Destructuring Assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
(see also https://codeburst.io/es6-destructuring-the-complete-guide-7f842d08b98f)

## Simple Example
```
const student = {
    id: 123,
    name: 'Susan',
    grade: 82
}

const { id, grade } = student;

console.log(id); // 123
console.log(grade); // 82
```

This is equivalent to:
```
const student = {
    id: 123,
    name: 'Susan',
    grade: 82
}

const id = student.id;
const grade = student.grade;
```


## Renaming
```
const student = {
    id: 123,
    name: 'Susan',
    grade: 82
}

const { id, grade: score } = student;

console.log(id); // 123
console.log(score); // 82
```

## Default Values
```
const student = {
    id: 123,
    name: 'Susan',
    grade: 82
}

const { id, grade = 0, school = 'Unknown' } = student;

console.log(id); // 123
console.log(grade); // 82
console.log(school); // 'Unknown' 
```

## Renaming AND Default Values
```
const student = {
    id: 123,
    name: 'Susan',
    grade: 82
}

const { id, grade: score = 50, school: building = 'Unknown' } = student;

console.log(id); // 123
console.log(score); // 82
console.log(building); // 'Unknown'
```

## Nested Object Destructuring

```
const student = {
    name: 'John Doe',
    age: 16,
    scores: {
        math: 74,
        english: 63
    }
};

const { name, scores: {math, english} } = student;

console.log(`${name} scored ${math} in Math and ${english} in English.`);
```

## Function Parameters
```
function makeAvatar({
  username = 'system',
  dimensions = {
    width: 100,
    height: 100
  }} = {}) {
  console.log(username, dimensions);
}

makeAvatar({
  username: 'hack-yqr'
}); // 'hack-yqr', { width: 100, height: 100 }
```

## [Rest]([https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Rest_in_Object_Destructuring))
> Rest properties collect the remaining own enumerable property keys that are not already picked off by the destructuring pattern.
> 
```
const student = {
    id: 123,
    name: 'Susan',
    grade: 82
}

const { id, ...leftovers } = student;

console.log(id); // 123
console.log(leftovers); // { name: 'Susan', grade: 82 }
```

## For of
```
var people = [
  {
    name: 'Mike Smith',
    family: {
      mother: 'Jane Smith',
      father: 'Harry Smith'
    }
  },
  {
    name: 'Tom Jones',
    family: {
      mother: 'Norah Jones',
      father: 'Richard Jones'
    }
  }
];

for (var {name: n, family: {father: f}} of people) {
  console.log(`Name: ${n}, Father: ${f}`);
}
```


# [Array Destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Array_destructuring)
Simple Example
```
const arr = [ 'a', 'b', 'c' ];

const [first, second, third] = arr;


console.log(first); // 'a'
console.log(second); // 'b'
console.log(third); // 'c'
```

## Ignoring elements
```
const arr = [ 'a', 'b', 'c' ];

const [,, third] = arr;

console.log(first); // undefined
console.log(second); // undefined
console.log(third); // 'c'
```

## Rest
```
const arr = [ 'a', 'b', 'c' ];

const [first, ...tail] = arr;

console.log(first); // 'a'
console.log(tail); // [ 'b', 'c' ]
```
Note that the rest pattern must be at the end of the array destructuring expression (eg: `const [...head, last] = arr` will throw an error)

## Default Values
```
const arr = [ 'a', 'b' ];

const [first = 'x', second = 'y', third = 'z'] = arr;

console.log(first); // 'a'
console.log(second); // 'b'
console.log(third); // 'z'
```

## Swapping variables
```
var a = 1;
var b = 3;

[a, b] = [b, a];
console.log(a); // 3
console.log(b); // 1
```

## Function return values
```
function f() {
  return [1, 2];
}

var a, b; 
[a, b] = f(); 
console.log(a); // 1
console.log(b); // 2
```

## Computed property names
```
let key = 'z';
let {[key]: foo} = {z: 'bar'};

console.log(foo); // 'bar'
```


# [Spread Operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
> Spread syntax allows an iterable such as an array expression or string to be expanded in places where zero or more arguments (for function calls) or elements (for array literals) are expected, or an object expression to be expanded in places where zero or more key-value pairs (for object literals) are expected.

## Function arguments
```
// Math.min(...args) { }
// Usage: Math.min(100, 12, 17);

const numbers = [1, 2, 3];

Math.min(numbers); // No - min does not take an array
Math.min(...numbers); // Yes - equivalent to Math.min(1, 2, 3);
```

## Array Literals
```
var parts = ['shoulders', 'knees']; 

var lyrics = ['head', ...parts, 'and', 'toes']; 
// ["head", "shoulders", "knees", "and", "toes"]

console.log(lyrics);
```

## Shallow object copy
```
const student = {
    id: 123,
    name: 'Susan',
    grade: 82
}
const shallowCopy = { ...student };
shallowCopy.grade = 85;

console.log(student) // { id: 123, name: 'Susan', grade: 82 }
console.log(shallowCopy) // { id: 123, name: 'Susan', grade: 85 }
```

Note: This is only a shallow copy. It's equivalent to:
```
const student = {
    id: 123,
    name: 'Susan',
    grade: 82
}
const shallowCopy = {
  id: student.id,
  name: student.name,
  grade: student.grade,
};
```

Second-level references are just copied into the new object. Changes to nested references will be reflected across both objects.
```
const point1 = {
    coordinates: {
      x: 100,
      y: 200,
    }
}
const point2 = { ...point1 }
point2.coordinates.x = 300;

console.log(point1); // { coordinates: { x: 300, y: 200 } }
console.log(point2); // { coordinates: { x: 300, y: 200 } }
```


## Shallow array copy
```
var arr = [1, 2, 3];
var arr2 = [...arr];
arr2.push(4); 

console.log(arr); // [1, 2, 3]
console.log(arr2); // [1, 2, 3, 4]
```

## Merging objects
```
const defaultTrophyOptions = {
  size: 'medium',
  sport: 'curling'
};

const userTrophyOptions = {
  size: 'large',
  engraving: 'Hack Regina Rocks'
};

const trophyOptions = {
  ...defaultTrophyOptions,
  ...userTrophyOptions
};

console.log(trophyOptions); // { size: 'large', sport: 'curling', engraving: 'Hack Regina Rocks' }
```
