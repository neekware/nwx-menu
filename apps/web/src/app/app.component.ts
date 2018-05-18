import { Component } from '@angular/core';

import { CfgService, DefaultCfg } from '@nwx/cfg';
import { LogService } from '@nwx/logger';

import { MenuService, MenuItem } from 'pkgs/menu';

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
        name: 'Portfolio',
        icon: 'account-check',
        link: '/finance/stocks/own'
      },
      {
        name: 'Wishlist',
        icon: 'playlist-check',
        link: '/finance/stocks/wishlist',
        disabled: true // feature disabled
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
  options = {};
  constructor(public cfg: CfgService, public log: LogService, public menu: MenuService) {
    this.title = this.cfg.options.appName;
    this.log.info('AppComponent loaded ...');
  }

  checkMenu() {
    const menuTree = this.menu.buildMenuTree(DefaultMenuTree);
  }
}
