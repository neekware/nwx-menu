/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at http://neekware.com/license/MIT.html
 */

import { TestBed, inject } from '@angular/core/testing';

import { MenuModule } from '../src/menu.module';
import { MenuService } from '../src/menu.service';

describe('MenuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MenuModule]
    });
  });

  it(
    'should be created',
    inject([MenuService], (service: MenuService) => {
      expect(service).toBeTruthy();
    })
  );
});
