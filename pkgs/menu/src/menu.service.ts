/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at http://neekware.com/license/MIT.html
 */

import { Injectable } from '@angular/core';

import { get } from 'lodash';

import { MenuItem, PermissionVerificationFuncType } from './menu.types';
import { DefaultMenuTree } from './menu.defaults';
import { MenuNode } from './menu.utils';
import { MenuModule } from './menu.module';

@Injectable({
  providedIn: MenuModule
})
export class MenuService {
  private _rootNode: MenuNode = new MenuNode({ name: 'root' });
  private _isAllowed: PermissionVerificationFuncType = null;

  constructor() {
    this.setPermissionVerificationFunction((node: MenuItem) => true);
  }

  buildMenuTree(menuItems: MenuItem[], force = false) {
    if (this._rootNode.children.length === 0 || force) {
      this._rootNode.children = this.makeMenuTree(menuItems, null);
    }
    return this._rootNode;
  }

  private makeMenuTree(
    itemList: MenuItem[],
    parent: MenuNode = null,
    level = 1
  ): MenuNode[] {
    const tree: MenuNode[] = [];
    for (const item of itemList) {
      if (!item.hasOwnProperty('name')) {
        throw Error(`Menu item missing 'name'`);
      }
      const allowed = get(item, 'allowed', true);
      if (allowed && this._isAllowed(item)) {
        const newItem = new MenuNode(item);
        newItem.level = level;
        newItem.parent = parent;
        if (item.hasOwnProperty('children')) {
          if (item.children.length > 0) {
            newItem.children = this.makeMenuTree(item.children, newItem, level + 1);
          }
        }
        tree.push(newItem);
      }
    }
    return tree;
  }

  setPermissionVerificationFunction(func: PermissionVerificationFuncType) {
    this._isAllowed = func;
  }
}
