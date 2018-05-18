/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at http://neekware.com/license/MIT.html
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JwtService } from './jwt.service';

/**
 * JWT module class
 */
@NgModule({
  imports: [CommonModule]
})
export class JwtModule {}
