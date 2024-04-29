import { RouterModule, Routes } from '@angular/router';
import { GoalsTabsComponent } from './components/goals-tabs/goals-tabs.component';

export const routes: Routes = [
  { path: '', redirectTo: '/goals', pathMatch: 'full' },
  { path: 'goals', component: GoalsTabsComponent }
];

export const AppRoutingModule = RouterModule.forRoot(routes);
