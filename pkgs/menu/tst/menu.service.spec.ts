/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at http://neekware.com/license/MIT.html
 */

import { TestBed, inject } from '@angular/core/testing';

import { MenuItem } from '../src/menu.types';
import { MenuModule } from '../src/menu.module';
import { MenuService } from '../src/menu.service';

export const DefaultMenuTree: MenuItem[] = [
  {
    name: 'Admin',
    icon: 'wrench',
    permissions: [
      'admin_root', // superuser
      'admin_staff', // staff
      'admin_finance', // finance
      'admin_hr' // HR
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
        permissions: ['group.subscriptions_level_1']
      },
      {
        name: 'Trade', // paid users can trade
        icon: ' home-currency-usd',
        link: '/finance/stocks/trade',
        permissions: ['group.subscriptions_level_1']
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

function hasPermission(node: MenuItem) {
  const menuPerms = node.permissions || [];
  if (menuPerms.length === 0) {
    return true;
  }

  const userPerms = ['admin_finance'];
  if (menuPerms.length === 0) {
    return false;
  }

  const hasPerm = menuPerms.some(value => userPerms.indexOf(value) >= 0);
  return hasPerm;
}

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

  it(
    'should create menu',
    inject([MenuService], (service: MenuService) => {
      const menuTree = service.buildMenuTree(DefaultMenuTree);
      expect(menuTree.level).toEqual(0);
      expect(menuTree.children[0].level).toEqual(1);
    })
  );

  it(
    'should create menu with permission verification (isAllowed === true)',
    inject([MenuService], (service: MenuService) => {
      service.setPermissionVerificationFunction(hasPermission);
      const menuTree = service.buildMenuTree(DefaultMenuTree);
      const admin = menuTree.children.filter(node => node.name === 'Admin');
      expect(admin).toBeTruthy();

      const subscriptions = admin[0].children.filter(
        node => node.name === 'Subscriptions'
      );
      expect(subscriptions.length).toEqual(1);
      expect(subscriptions[0].link).toBeTruthy('/admin/accounts/Subscriptions');
    })
  );

  it(
    'should create menu with permission verification (isAllowed === false)',
    inject([MenuService], (service: MenuService) => {
      service.setPermissionVerificationFunction(hasPermission);
      const menuTree = service.buildMenuTree(DefaultMenuTree);
      const admin = menuTree.children.filter(node => node.name === 'Admin');
      expect(admin).toBeTruthy();

      const subscriptions = admin[0].children.filter(node => node.name === 'Settings');
      expect(subscriptions.length).toEqual(0);
    })
  );
});
