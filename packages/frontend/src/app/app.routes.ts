import { RouterModule, Routes } from '@angular/router';
import { GoalsListComponent } from './components/goals-list/goals-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/goals', pathMatch: 'full' },
  { path: 'goals', component: GoalsListComponent }
];

export const AppRoutingModule = RouterModule.forRoot(routes);
