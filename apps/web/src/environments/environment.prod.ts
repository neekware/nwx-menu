import { AppCfg, TargetPlatform, HttpMethod } from '@nwx/cfg';
import { LogLevels } from '@nwx/logger';

export const environment: AppCfg = {
  // app name
  appName: '@nwx/jwt',
  // target (browser, mobile, desktop)
  target: TargetPlatform.web,
  // production, staging or development
  production: true,
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
