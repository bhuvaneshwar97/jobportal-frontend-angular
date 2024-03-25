import { INavData } from '@coreui/angular';
import { freeSet } from '@coreui/icons'

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' }
  },
  {
    name: 'Job Appllications',
    url: '',
    iconComponent: { name: '' },
    children: [
      {
        name: 'Job Appllications',
        url: '/jobapplications',
        iconComponent: { name: '' },
      }
    ]
  }
];