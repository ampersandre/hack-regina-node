# Modules

Modules are Node's mechanism for exposing functionality across source files. Let's cover what goes on when we declare modules and include them across files.


## CommonJS
CommonJS drives the module format used by NodeJS:
```
const fs = require('fs');

class Student {
    study() {
        ...
    }
}

module.exports = Student;
```

In ES6, this has been simplified to:
```
import fs from 'fs';

export default class Student {
    study() {
        ...
    }
}
```


## Under the hood

When a module is loaded, it wraps the contents of the requested file with the following:

```
define(function (exports, require, module, __filename, __dirname) {
    module.exports = exports = {};

    // Your code...

});
```

`exports`: the container desired exports will be attached to

`require`: the `require` method that is used to import subsequent moduels

`module`: a bag of properties pertaining to this module (eg: whether or not it's loaded, utility functions for loading, etc)

`__filename`: eg `/path/to/your/file.js`

`__dirname`: eg `/path/to/your/`


## Module resolution
Modules are resolved in the following order:
The `require` function will look for files in the following order:

1. Built-in core Node.js modules (like `fs`)
2. Modules in the `node_modules` folder.
3. If the module name has a `./`, `/` or `../`, it will look for the directory/file in the given path. It matches the file extensions `*.js` and `*.json`