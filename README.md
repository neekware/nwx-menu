# @nwx/jwt

**A simple JWT module for Angular applications**

[![status-image]][status-link]
[![version-image]][version-link]
[![coverage-image]][coverage-link]
[![download-image]][download-link]

# How to install

    npm i @nwx/jwt |OR| yarn add @nwx/jwt

# How to use

```typescript
// In your environment{prod,staging}.ts

import { AppCfg, TargetPlatform } from '@nwx/cfg';
import { LogLevels } from '@nwx/logger';

export const environment: AppCfg = {
  // app name
  appName: '@nwx/jwt',
  // target (browser, mobile, desktop)
  target: TargetPlatform.web,
  // production, staging or development
  production: false,
  log: {
    // log level (application-wide)
    level: LogLevels.debug
  },
  jwt: {
    // estimate time of http request between client -> server (greater than zero)
    networkDelay: 1,
    // few seconds to make the randomizer work. backend can overwrite
    expiryLeeway: 5
  }
};
```

```typescript
// In your app.module.ts

import { CfgModule } from '@nwx/cfg';
import { LoggerModule } from '@nwx/logger';
import { JwtModule } from '@nwx/jwt';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CfgModule.forRoot(environment), // make the environment injectable
    LoggerModule,
    JwtModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

```typescript
// In your app.module.ts

import { Component } from '@angular/core';
import { CfgService, DefaultCfg } from '@nwx/cfg';
import { LogService } from '@nwx/logger';
import { jwtService } from '@nwx/jwt';

@Component({
  selector: 'app-root',
  template: `<h1>Welcome to {{ title }}!</h1>`
})
export class AppComponent {
  title = 'Neekware';
  options = {};
  constructor(public cfg: CfgService, public log: LogService, public jwt: JwtService) {
    this.title = this.cfg.options.appName;
    this.log.info('AppComponent loaded ...');

    const someToken = 'some-jwt-token-received-from-server'; // <part-1>.<part-2>.<part-2>
    const payload = this.jwt.getPayload(someToken);
    const isExpired = this.jwt.isExpired(payload);
    if (!isExpired) {
      const userId = payload.sub;
      const nextRefresh = this.jwt.getRefreshTime(payload);
      setTimeout(() => {
        // connect to the server to get a new token
      }, nextRefresh * 1000);
    }
  }
}
```

# Running the tests

To run the tests against the current environment:

    npm run ci:all

# License

Released under a ([MIT](https://github.com/neekware/nwx-jwt/blob/master/LICENSE)) license.

# Version

X.Y.Z Version

    `MAJOR` version -- making incompatible API changes
    `MINOR` version -- adding functionality in a backwards-compatible manner
    `PATCH` version -- making backwards-compatible bug fixes

[status-image]: https://secure.travis-ci.org/neekware/nwx-jwt.png?branch=master
[status-link]: http://travis-ci.org/neekware/nwx-jwt?branch=master
[version-image]: https://img.shields.io/npm/v/@nwx/jwt.svg
[version-link]: https://www.npmjs.com/package/@nwx/jwt
[coverage-image]: https://coveralls.io/repos/neekware/nwx-jwt/badge.svg
[coverage-link]: https://coveralls.io/r/neekware/nwx-jwt
[download-image]: https://img.shields.io/npm/dm/@nwx/jwt.svg
[download-link]: https://www.npmjs.com/package/@nwx/jwt
