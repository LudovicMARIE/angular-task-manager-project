import { Component, inject, DestroyRef, signal } from '@angular/core';
import { TaskService } from '../task/services/taskService';
import { Tasks } from '../task/interfaces/tasks';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../core/auth/services/auth-service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  protected taskService: TaskService = inject(TaskService);
  protected authService: AuthService = inject(AuthService);
  private destroyRef = inject(DestroyRef);

  tasks = signal<Tasks[]>([]);
  tasksDone = signal<number>(0);
  tasksAdmin = signal<Tasks[]>([]);
  progress = signal<number>(0);

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.taskService
      .getAllTask()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (tasks: Tasks[]) => {
          // get all tasks
          this.tasks.set(tasks);

          // get all tasks 'DONE'
          for (let index = 0; index < tasks.length; index++) {
            const element = tasks[index];
            if (element.status == 'DONE') this.tasksDone.update((value) => value + 1);
          }

          // get all tasks associated with 'ADMIN' role
          for (let index = 0; index < tasks.length; index++) {
            const element = tasks[index];
            if (element.user?.role == 'ADMIN') {
              this.tasksAdmin.update((value) => [...value, element]);
            }
          }
        },
        error: () => console.log('error'),
      });
  }
}
