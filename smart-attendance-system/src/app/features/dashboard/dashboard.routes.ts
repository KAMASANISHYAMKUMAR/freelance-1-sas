import { Routes } from '@angular/router';
import { RoleGuard } from '../../core/guards/role.guard';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'admin',
    canActivate: [RoleGuard],
    data: { roles: ['admin'] },
    loadComponent: () => import('./admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
  },
  {
    path: 'staff',
    canActivate: [RoleGuard],
    data: { roles: ['staff'] },
    loadComponent: () => import('./staff-dashboard/staff-dashboard.component').then(m => m.StaffDashboardComponent)
  },
  {
    path: 'student',
    canActivate: [RoleGuard],
    data: { roles: ['student'] },
    loadComponent: () => import('./student-dashboard/student-dashboard.component').then(m => m.StudentDashboardComponent)
  }
]; 