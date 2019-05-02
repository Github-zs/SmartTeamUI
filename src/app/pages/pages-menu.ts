import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: '首页',
    icon: 'nb-home',
    link: '/pages/dashboard-management/dashboard-page',
    home: true,
  },
  {
    title: '任务总揽',
    icon: 'nb-list',
    link: '',
  },
  {
    title: '文档',
    icon: 'nb-title',
    children: [
      {
        title: '需求文档',
        link: '',
      },
      {
        title: '设计文档',
        link: '',
      },
    ],
  },
  {
    title: '技术分享',
    icon: 'nb-paper-plane',
    link: '/pages/technology-share-management/technology-share-page',
  },
  {
    title: '个人空间',
    icon: 'nb-compose',
    link: '/pages/personal-space-management/personal-space-page',
  },
  {
    title: '重置密码',
    icon: 'nb-loop',
    link: '/pages/reset-password-management/reset-password',
  },

];
