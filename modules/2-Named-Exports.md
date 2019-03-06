# Named Exports

CommonJS example:
```
function foo() { ... }
function bar() { ... }

module.exports = {
    foo: foo,
    bar: bar
}
```
Or
```
module.exports = {
    foo: function() { ... },
    bar: function() { ... }
}
```

## Under the hood
```
(function (exports, require, module, __filename, __dirname) {
    module.exports = exports = {};
    
    function foo() { ... }
    function bar() { ... }

    module.exports = {
        foo: foo,
        bar: bar
    }

});
```


## ES6
**./speechUtils.js**
```
export function hello() {
    return 'Hello';
}

export function goodbye() {
    return 'Goodbye';
}
```

This module results in an `exports` variable that looks like this:
```
{
    hello: function() { return 'Hello'; },
    goodbye: function() { return 'Goodbye'; }
}
```

**./index.js**
```
import { hello, goodbye } from './speechUtils';

console.log(hello());
console.log(goodbye());
```

Alternatively,
```
import { hello as hi, goodbye } from './speechUtils';

console.log(hi());
console.log(goodbye());
```
```
import * as speech from './speechUtils';

console.log(speech.hello());
console.log(speech.goodbye());
```
