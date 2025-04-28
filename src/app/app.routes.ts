import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MainLayoutComponent } from './shared/shared-components/layout/main-layout/main-layout.component';
import { BusinessCardsIndexComponent } from './pages/business-cards/business-cards-index/business-cards-index.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        data: {
          breadcrumb: 'Home',
        },
        children: [
          {
            path: '',
            component: HomeComponent,
            data: {
              breadcrumb: 'Home',
            },
          },
          {
            path: 'businuss-cards',
            component: BusinessCardsIndexComponent,
            data: {
              breadcrumb: 'Business Cards',
            },
          }
        ]
    },
];
