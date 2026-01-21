import { DatePipe } from '@angular/common';
import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommentsList } from '../comments-list';
import { Status, Tasks } from '../interfaces/tasks';
import { TaskStatusPipe } from '../pipe/task-status-pipe';
import { TaskService } from '../services/taskService';

@Component({
  standalone: true,
  selector: 'app-task-detail',
  imports: [RouterLink, TaskStatusPipe, DatePipe, CommentsList],
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.css',
})
export class TaskDetail implements OnInit {
  private taskService = inject(TaskService);

  @Input() id?: string;

  task = signal<Tasks | undefined>(undefined);

  ngOnInit(): void {
    if (!this.id) return;
    this.taskService.getTaskById(+this.id).subscribe({
      next: (t: Tasks) => this.task.set(t),
      error: () => console.log('error'),
    });
  }

  getStatusColor(status: Status | undefined) {
    switch (status) {
      case Status.PENDING:
        return 'bg-red-100 text-red-800';
      case Status.IN_PROGRESS:
        return 'bg-amber-100 text-amber-800';
      case Status.DONE:
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  }
}
