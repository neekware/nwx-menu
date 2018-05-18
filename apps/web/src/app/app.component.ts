import { Component } from '@angular/core';

import { CfgService, DefaultCfg } from '@nwx/cfg';
import { LogService } from '@nwx/logger';

import { JwtService } from 'pkgs/jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Neekware';
  options = {};
  constructor(public cfg: CfgService, public log: LogService, public jwt: JwtService) {
    this.title = this.cfg.options.appName;
    this.log.info('AppComponent loaded ...');
    this.checkToken();
  }

  validToken() {
    // tslint:disable-next-line
    return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJOZWVrd2FyZSBKV1QgQXV0aG9yaXR5ICIsImlhdCI6MjUyOTk0NzU2OSwiZXhwIjoyNTMyNjI1OTY5LCJhdWQiOiJ3d3cubmVla3dhcmUuY29tIiwic3ViIjoiMjIifQ.05FqKNyDJSGceqjUPF0DhI8lLsEYF_2mzHbEvP6MUu8';
  }

  checkToken() {
    const payload = this.jwt.getPayload(this.validToken());
    const isExpired = this.jwt.isExpired(payload);
    if (!isExpired) {
      const userId = payload.sub;
      const nextRefresh = this.jwt.getRefreshTime(payload);
      this.log.debug(`Token expires in ${nextRefresh * 1000} seconds`);
    }
  }
}
