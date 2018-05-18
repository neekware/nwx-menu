import { AppCfg, TargetPlatform, HttpMethod } from '@nwx/cfg';
import { LogLevels } from '@nwx/logger';

export const environment: AppCfg = {
  // app name
  appName: '@nwx/menu',
  // target (browser, mobile, desktop)
  target: TargetPlatform.web,
  // production, staging or development
  production: false,
  log: {
    // log level (application-wide)
    level: LogLevels.debug
  },
};
