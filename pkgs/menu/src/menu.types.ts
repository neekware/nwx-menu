/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at http://neekware.com/license/MIT.html
 */

import { get } from 'lodash';

export class MenuItem {
  // translatable name of this menu
  name: string;
  // icon for the menu
  icon?: string;
  // if link (clickable)
  link?: string;
  // hides menu, navigation, popups (ex: calendar page is fullspan)
  fullspan?: boolean;
  // if external link
  external?: boolean;
  // open in new tab (_blank)
  target?: string;
  // if menu is disabled
  disabled?: boolean;
  // if menu is allowed (permission) - for manual override
  allowed?: boolean;
  // permissions required to render this menu
  permissions?: string[];
  // submenu
  children?: MenuItem[];
}

/** Signature function for whether menu item is allowed to be rendered */
export type PermissionVerificationFuncType = (item: MenuItem) => boolean;
