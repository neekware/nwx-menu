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

const DefaultMenuTree: MenuItem[] = [
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
    name: 'Change Language',
    link: '/settings/language',
  },
  {
    name: 'Yahoo Finance',
    link: 'https://yahoo.com',
    external: true,
    disabled: true
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
    'should create menu - (isAllowed === true)',
    inject([MenuService], (service: MenuService) => {
      service.setPermissionVerificationFunction(hasPermission);
      const menuTree = service.buildMenuTree(DefaultMenuTree);
      const admin = menuTree.children.filter(node => node.name === 'Admin');
      expect(admin).toBeTruthy();

      const subscriptions = admin[0].children.filter(
        node => node.name === 'Subscriptions'
      );
      expect(subscriptions.length).toEqual(1);
      expect(subscriptions[0].link).toEqual('/admin/accounts/Subscriptions');
      expect(subscriptions[0].fullspan).toEqual(true);
    })
  );

  it(
    'should create menu - isActive, isLink, isNode, isFullspan',
    inject([MenuService], (service: MenuService) => {
      service.setPermissionVerificationFunction(hasPermission);
      const menuTree = service.buildMenuTree(DefaultMenuTree);
      const admin = menuTree.children.filter(node => node.name === 'Admin');
      expect(admin[0].isNode).toEqual(true);
      expect(admin[0].isLink).toEqual(false);
      expect(admin[0].isActive('/admin/accounts/Subscriptions')).toEqual(true);
      expect(admin[0].isActive('/invalid/node')).toEqual(false);

      const subscriptions = admin[0].children.filter(
        node => node.name === 'Subscriptions'
      );

      expect(subscriptions[0].isActive('/admin/accounts/Subscriptions')).toEqual(true);
      expect(subscriptions[0].isActive('/invalid/link')).toEqual(false);
      expect(admin[0].isFullspan).toEqual(false);
      expect(subscriptions[0].isInternalLink).toEqual(true);
    })
  );

  it(
    'should create menu - (isAllowed === false)',
    inject([MenuService], (service: MenuService) => {
      service.setPermissionVerificationFunction(hasPermission);
      const menuTree = service.buildMenuTree(DefaultMenuTree);
      const admin = menuTree.children.filter(node => node.name === 'Admin');
      expect(admin).toBeTruthy();

      const subscriptions = admin[0].children.filter(node => node.name === 'Settings');
      expect(subscriptions.length).toEqual(0);
    })
  );

  it(
    'should create menu - target & external, icon',
    inject([MenuService], (service: MenuService) => {
      service.setPermissionVerificationFunction(hasPermission);
      const menuTree = service.buildMenuTree(DefaultMenuTree);
      const admin = menuTree.children.filter(node => node.name === 'Youtube');
      expect(admin).toBeTruthy();
      expect(admin[0].target).toEqual('_blank');
      expect(admin[0].external).toEqual(true);
      expect(admin[0].icon).toEqual('youtube');
    })
  );

  it(
    'should create menu - children, allowed, no icons',
    inject([MenuService], (service: MenuService) => {
      service.setPermissionVerificationFunction(hasPermission);
      const menuTree = service.buildMenuTree(DefaultMenuTree);
      const admin = menuTree.children.filter(node => node.name === 'Yahoo Finance');
      expect(admin).toBeTruthy();
      expect(admin[0].allowed).toEqual(true);
      expect(admin[0].disabled).toEqual(true);
      expect(admin[0].icon).toEqual(null);
      expect(admin[0].children.length).toEqual(0);
    })
  );

  it(
    'should create menu - offset, node, link, internal, external ...',
    inject([MenuService], (service: MenuService) => {
      service.setPermissionVerificationFunction(hasPermission);
      const menuTree = service.buildMenuTree(DefaultMenuTree);
      const admin = menuTree.children.filter(node => node.name === 'Yahoo Finance');
      expect(admin).toBeTruthy();
      expect(admin[0].offset(0.9, 'rem')).toEqual('0.9rem');
      expect(admin[0].isNode).toEqual(false);
      expect(admin[0].isLink).toEqual(true);
      expect(admin[0].hasChildren).toEqual(false);
      expect(admin[0].isExternalLink).toEqual(true);
      expect(admin[0].isInternalLink).toEqual(false);
    })
  );

  it(
    'should create menu - empty name ...',
    inject([MenuService], (service: MenuService) => {
      expect(() => {
        service.buildMenuTree([{ name: '' }]);
      }).toThrow(new Error(`Menu item missing 'name'`));
    })
  );
});
