# Simple NPM Module

Install:
```
npm install @your-username/my-module
```

Usage:
```
import { makeStringArray } from '@your-username/my-module';


console.log(makeStringArray(1, 'yqr')); // ['yqr'];
console.log(makeStringArray(3, 'yqr')); // ['yqr', 'yqr', 'yqr'];
```


## Publish your module

Follow these steps to publish this module
1. This `package.json` defines the project name as `@your-username/my-module`. Go ahead and replace that with your own npm username
2. `npm login` from the command line to authenticate with npm
3. Make sure your package's version is correct, and run `npm publish --access public`

To include this module in your other project, you would run
`npm install @your-username/my-module`

## [Private packages](https://docs.npmjs.com/creating-and-publishing-private-packages)

Package visibility is controlled by the package scope, which is specified by the package name:

`"name": "my-module"`:
- A public module - `npm install my-module@1.2.3`, `import foo from 'my-module';`  
  
`"name": "@org/my-module"`:
- A scoped module `npm install @org/my-module@1.2.3`, `import foo from '@org/my-module';`

If you want to publish a private module, or if your module name clashes with an existing module, you **must** scope your package name, eg:
```
{
    ...
    "name": "@my-account/left-pad"
    ...
}
```

- **Unscoped** packages are always **public**.
- **Private** packages are always **scoped**.
- Scoped packages are **private** by default; you must pass a command-line flag when publishing to make them public: `npm publish --access public`


## package.json properties

NPM uses package.json not just to define the application for your own use, but it also provides information for consumers of your package.

From ([npmjs.com](https://docs.npmjs.com/files/package.json))

> `name`: If you plan to publish your package, the most important things in your package.json are the name and version fields as they will be required. The name and version together form an identifier that is assumed to be completely unique. Changes to the package should come along with changes to the version. If you don’t plan to publish your package, the name and version fields are optional.
> 
> The name is what your thing is called.

> `version`: If you plan to publish your package, the most important things in your package.json are the name and version fields as they will be required. The name and version together form an identifier that is assumed to be completely unique. Changes to the package should come along with changes to the version. If you don’t plan to publish your package, the name and version fields are optional.
>
> Version must be parseable by node-semver

> `main`: The main field is a module ID that is the primary entry point to your program. That is, if your package is named foo, and a user installs it, and then does require("foo"), then your main module’s exports object will be returned.


## Publishing Hooks

```
{
    "scripts": {
        "prepublish": Run BEFORE the package is packed and published, as well as on local npm install without any arguments

        "prepare": Run both BEFORE the package is packed and published, on local npm install without any arguments, and when installing git dependencies. This is run AFTER prepublish, but BEFORE prepublishOnly

        "prepublishOnly: Run BEFORE the package is prepared and packed, ONLY on npm publish

        "publish", "postpublish": Run AFTER the package is published.
    }
}
```

## Module Linking

It can often be useful to install a package locally so that you can test it out in conjunction with another project, for example during local development.

For this, we can use `npm link`  

Eg:
```
cd dir/to/dependency/project
npm link
...
/Users/.../.node/lib/node_modules/@your-username/my-module -> /Users/.../publishing-an-npm-module
```
This adds a symlink to the current package in your system's `node_modules` cache, and that module can then be referenced by other projects.

Now, you can go into your other project and run:
```
npm link @your-username/my-module              ...
/Users/.../using-npm-module/node_modules/@your-username/my-module -> /Users/.../.node/lib/node_modules/@your-username/my-module -> /Users/.../publishing-an-npm-module
```

This will take the module that you symlinked earlier, and put it in the `node_modules` folder of your current project so you can test your local changes!