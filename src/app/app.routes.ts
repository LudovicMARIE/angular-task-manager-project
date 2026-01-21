import { Routes } from '@angular/router';
import { authGuard } from './core/auth/guards/auth-guard';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { TaskDetail } from './features/task/task-detail/task-detail';
import { TaskForm } from './features/task/task-form/task-form';
import { TaskList } from './features/task/task-list/task-list';

export const routes: Routes = [
  { path: 'register', component: Register },
  { path: 'login', component: Login },
  { path: 'tasks', component: TaskList, canActivate: [authGuard] },
  { path: 'tasks/:id', component: TaskDetail, canActivate: [authGuard] },
  { path: 'create', component: TaskForm, canActivate: [authGuard] },
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'edit/:id', component: TaskForm, canActivate: [authGuard] },
];
