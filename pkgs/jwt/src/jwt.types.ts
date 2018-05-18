/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at http://neekware.com/license/MIT.html
 */

/**
 * JWT config declaration
 */
export class JwtCfg {
  // http request round-trip in seconds
  networkDelay?: number;
  // refresh expired token up to leeway amount in seconds
  expiryLeeway?: number;
}
