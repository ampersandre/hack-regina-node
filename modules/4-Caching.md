# Caching

Modules are [cached](https://nodejs.org/api/modules.html#modules_caching) after the first time they are loaded.


**./logger.js**
```
import pino from 'pino';

const l = pino({
  name: process.env.APP_ID,
  level: process.env.LOG_LEVEL,
});

export default l;
```

**./controller.js**
```
import l from './logger;

...
l.info('Handling request');
```

**./service.js**
```
// Same instance as the one being used in ./controller.js
import l from './logger;

...
l.info('Doing service thing');
```

## Implications
![](https://i.imgflip.com/2vbqau.jpg)

Just be aware that if you export an instance, your consumers will all share that same instance. (exception: modules are cached based on case-sensitive filename, eg `./utils` and `./Utils` will result in two different loads of that module)

Additionally, avoid introducing any shared state in your module, unless you legitimately need it, eg:

**./football.js**
```
let score = 0;

export function touchdown() {
    score += 7;
    return score;
}
```

**./foo.js**
```
import { touchdown } from './football';

console.log(touchdown()); // 7
```

**./bar.js**
```
import { touchdown } from './football';

console.log(touchdown()); // 14
```
