# Library was deprecated in favor of [`@fullerstack/ngx-menu`](https://github.com/neekware/fullerstack/tree/main/libs/ngx-menu)

# @nwx/menu

**A simple menu module for Angular applications**

[![status-image]][status-link]
[![version-image]][version-link]
[![coverage-image]][coverage-link]
[![download-image]][download-link]

# How to install

    npm i @nwx/menu |OR| yarn add @nwx/menu

# How to use

```typescript
// app.modules.ts

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MenuModule } from '@nwx/menu';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, MenuModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

```typescript
// app.component.ts - or (menu.component.ts)

import { Component } from '@angular/core';
import { MenuService, MenuItem } from '@nwx/menu';

export const AppMenuTree: MenuItem[] = [
  {
    name: 'Admin',
    icon: 'wrench',
    permissions: [
      // superuser - full authorization
      'admin_superuser',
      // staff - limited auth - (ex: can't delete user)
      'admin_staff',
      // finance - limited auth - (ex: subscriptions, payables, etc.)
      'admin_finance',
      // HR = limited auth - (ex: access to performance reviews, benefits, etc.)
      'admin_hr'
    ],
    children: [
      {
        name: 'Accounts',
        icon: 'account',
        link: '/admin/accounts/profile'
      },
      {
        name: 'Settings',
        icon: 'account-card-details',
        link: '/admin/accounts/settings',
        fullspan: true,
        permissions: ['admin_root', 'admin_staff', 'admin_hr']
      },
      {
        name: 'Subscriptions',
        icon: ' account-multiple-check',
        link: '/admin/accounts/Subscriptions',
        fullspan: true,
        permissions: ['admin_root', 'admin_staff', 'admin_finance']
      }
    ]
  },
  {
    name: 'Stocks',
    icon: 'trending-up',
    children: [
      {
        name: 'Sandbox Portfolio', // all users can simulate buy/sell stocks
        icon: 'account-check',
        link: '/finance/stocks/own'
      },
      {
        name: 'Wishlist',
        icon: 'playlist-check',
        link: '/finance/stocks/wishlist',
        disabled: true // feature disabled (feature not ready)
      },
      {
        name: 'Portfolio', // paid users have real portfolio
        icon: 'account-check',
        link: '/finance/stocks/own',
        permissions: ['subscriptions_level_1']
      },
      {
        name: 'Trade', // paid users can trade
        icon: ' home-currency-usd',
        link: '/finance/stocks/trade',
        permissions: ['subscriptions_level_1']
      }
    ]
  },
  {
    name: 'Yahoo Finance',
    icon: 'google-analytics',
    link: 'https://yahoo.com',
    external: true
  },
  {
    name: 'Youtube',
    icon: 'youtube',
    link: 'https://youtube.com',
    external: true,
    target: '_blank'
  }
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Neekware';
  menuTree = null;
  user: {
    // user is fetched from the server upon authentication
    firstName: 'Val';
    lastName: 'Neekman';
    permissions: ['subscriptions_level_1'];
  };

  constructor(public menu: MenuService) {
    this.log.info('AppComponent loaded ...');
    this.buildMenu();
  }

  /**
   * Given a MenuItem, it returns true if item is allowed to display
   * @param node - MenuItem
   */
  private hasPermission(node: MenuItem) {
    const menuPerms = node.permissions || [];
    if (menuPerms.length === 0) {
      return true;
    }

    if (!this.user) {
      return false;
    }

    const userPerms = this.user.permissions || [];
    if (menuPerms.length === 0) {
      return false;
    }

    const hasPerm = menuPerms.some(value => userPerms.indexOf(value) >= 0);
    return hasPerm;
  }

  buildMenu() {
    this.menu.PermissionVerificationFuncType(this.hasPermission.bind(this));
    this.menuTree = this.menu.buildMenuTree(AppMenuTree);
    // menu is ready for rendering
  }
}
```

# Advanced usage:

Here are all the options for each menu items.

```typescript
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
```

Here are the helper functions on each MenuNode.

```typescript
// when looping through menu nodes
for (const node in menuTree.children) {
  // node.isLink - is a link or a node with children?
  // node..isNode - is a node with children?
  // node..hasChildren - has children?
  // node..isInternalLink - is a link & internal (ex: /dashboard/)
  // node..isExternalLink - is a link * external (ex: www.youtube.com)
  // node..isFullspan - is link that requires menu to slide away
  // node..offset(value: number, unit = 'px') - offset for multi-level menu (for margin or padding)
  // node..isActive(url: string) - is this node active for the active route
}
```

# Running the tests

To run the tests against the current environment:

    npm run ci:all

# License

Released under a ([MIT](https://github.com/neekware/nwx-menu/blob/master/LICENSE)) license.

# Version

X.Y.Z Version

    `MAJOR` version -- making incompatible API changes
    `MINOR` version -- adding functionality in a backwards-compatible manner
    `PATCH` version -- making backwards-compatible bug fixes

[status-image]: https://secure.travis-ci.org/neekware/nwx-menu.png?branch=master
[status-link]: http://travis-ci.org/neekware/nwx-menu?branch=master
[version-image]: https://img.shields.io/npm/v/@nwx/menu.svg
[version-link]: https://www.npmjs.com/package/@nwx/menu
[coverage-image]: https://coveralls.io/repos/neekware/nwx-menu/badge.svg
[coverage-link]: https://coveralls.io/r/neekware/nwx-menu
[download-image]: https://img.shields.io/npm/dm/@nwx/menu.svg
[download-link]: https://www.npmjs.com/package/@nwx/menu

# Sponsors

[Neekware Inc.](https://github.com/neekware)
