# Let's convert this Express App to TypeScript


### 1. Add TypeScript
`npm install --save-dev typescript`
`npm install --save-dev @types/node`

### 2. Create `tsconfig.json`

Place a file called `tsconfig.json` in the root of your project that looks like this:
```
{
    "compilerOptions": {
        "module": "commonjs",
        "esModuleInterop": true,
        "target": "es6",
        "noImplicitAny": false,
        "moduleResolution": "node",
        "sourceMap": true,
        "allowJs": true,
        "outDir": "dist",
        "baseUrl": ".",
        "types": ["node"],
        "paths": {
            "*": [
                "node_modules/*"
            ]
        }
    },
    "include": [
        "src/**/*"
    ]
}
```
(see [full list of compiler options](https://www.typescriptlang.org/docs/handbook/compiler-options.html))

### 3. Update `package.json` scripts

Replace this:
```
  "main": "app.js",
  "scripts": {
    "start": "node src/app.js"
  }
```

With this:
```
  "main": "dist/app.js",
  "scripts": {
    "build": "tsc",
    "prestart": "npm run build",
    "start": "node ."
  }
```

### 4. Run it!
`npm run start`

See more at https://developer.okta.com/blog/2018/11/15/node-express-typescript