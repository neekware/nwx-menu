/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at http://neekware.com/license/MIT.html
 */

import { JwtModule } from '../src/jwt.module';

describe('JwtModule', () => {
  let jwtModule: JwtModule;

  beforeEach(() => {
    jwtModule = new JwtModule();
  });

  it('should create an instance', () => {
    expect(jwtModule).toBeTruthy();
  });
});
