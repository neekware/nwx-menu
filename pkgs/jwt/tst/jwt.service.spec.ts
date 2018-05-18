/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at http://neekware.com/license/MIT.html
 */

import { TestBed, inject } from '@angular/core/testing';

import { isMatch } from 'lodash';

import { CfgModule } from '@nwx/cfg';
import { LogModule } from '@nwx/logger';

import { JwtModule } from '../src/jwt.module';
import { JwtService } from '../src/jwt.service';

const validToken = () => {
  // tslint:disable-next-line
  return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJOZWVrd2FyZSBKV1QgQXV0aG9yaXR5ICIsImlhdCI6MjUyOTk0NzU2OSwiZXhwIjoyNTMyNjI1OTY5LCJhdWQiOiJ3d3cubmVla3dhcmUuY29tIiwic3ViIjoiMjIifQ.05FqKNyDJSGceqjUPF0DhI8lLsEYF_2mzHbEvP6MUu8';
};

const expiredToken = () => {
  // tslint:disable-next-line
  return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJOZWVrd2FyZSBKV1QgQXV0aG9yaXR5ICIsImlhdCI6Mjg5MzM2MzY5LCJleHAiOjI5MjAxNDc2OSwiYXVkIjoid3d3Lm5lZWt3YXJlLmNvbSIsInN1YiI6IjIyIn0.aONSjDJrnVBbzeWeTt7Rs9WIb-SWuN99XgK5Lo6dKGo';
};

const validPayload = (): Object => {
  return {
    // Identifier (or, name) of the server or system issuing the token
    iss: 'Neekware JWT Authority ',
    // Date/time when the token was issued.
    iat: 2529947569, // 2050-03-03T19:12:49.785Z
    // Date/time at which point the token is no longer valid.
    exp: 2532625969, // 2050-04-03T19:12:49.785Z
    // Intended recipient of this token; recipient uses it when validating the token.
    aud: 'www.neekware.com',
    // Identifier (or, name) of the user this token represents. (user id)
    sub: '22'
  };
};

const expiredPayload = (): Object => {
  return {
    ...validPayload(),
    ...{
      iat: 289336369, // 1979-03-03T19:12:49.785Z
      exp: 292014769 // 1979-04-03T19:12:49.785Z
    }
  };
};

describe('JwtService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CfgModule.forRoot(), LogModule, JwtModule]
    });
  });

  it(
    'should be created',
    inject([JwtService], (service: JwtService) => {
      expect(service).toBeTruthy();
    })
  );

  it(
    'should get payload from token',
    inject([JwtService], (service: JwtService) => {
      const token = validToken();
      const payload = service.getPayload(token);
      expect(isMatch(payload, validPayload())).toEqual(true);
    })
  );

  it(
    'should verify expiry on a valid token',
    inject([JwtService], (service: JwtService) => {
      const token = validToken();
      const payload = service.getPayload(token);
      const isExpired = service.isExpired(payload);
      expect(isExpired).toBe(false);
    })
  );

  it(
    'should verify refresh time on a valid token',
    inject([JwtService], (service: JwtService) => {
      const token = validToken();
      const payload = service.getPayload(token);
      const refresh = service.getRefreshTime(payload);
      expect(refresh).toBeGreaterThan(0);
    })
  );
});
