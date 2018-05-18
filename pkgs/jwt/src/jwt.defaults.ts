/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at http://neekware.com/license/MIT.html
 */

import { JwtCfg } from './jwt.types';

/**
 * Default configuration - JWT module
 */
export const DefaultJwtCfg: JwtCfg = {
  // default of 1 second. frontend specific
  networkDelay: 1,
  // few seconds to make the randomizer work. backend can overwrite
  expiryLeeway: 5
};
