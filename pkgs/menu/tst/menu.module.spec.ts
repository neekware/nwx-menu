/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at http://neekware.com/license/MIT.html
 */

import { MenuModule } from '../src/menu.module';

describe('MenuModule', () => {
  let menuModule: MenuModule;

  beforeEach(() => {
    menuModule = new MenuModule();
  });

  it('should create an instance', () => {
    expect(menuModule).toBeTruthy();
  });
});
