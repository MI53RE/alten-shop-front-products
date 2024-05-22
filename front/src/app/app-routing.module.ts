import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicDashboardComponent } from './base/public-dashboard/public-dashboard.component';
import { AdminDashboardComponent } from './base/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  { path: 'products', component: PublicDashboardComponent },
  { path: 'admin/products', component: AdminDashboardComponent },
  { path: '**', redirectTo: 'products' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})

export class AppRoutingModule {}
