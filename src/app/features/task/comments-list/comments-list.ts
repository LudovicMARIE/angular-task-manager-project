import { CommonModule } from '@angular/common';
import { Component, inject, Input, signal, WritableSignal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth/services/auth-service';

interface CommentItem {
  author: string;
  message: string;
  date: string; // ISO string
  taskId?: number;
}

@Component({
  selector: 'app-comments-list',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './comments-list.html',
  styleUrl: './comments-list.css',
})
export class CommentsList {
  @Input() taskId?: number;

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  comments: WritableSignal<CommentItem[]> = signal<CommentItem[]>([
    {
      author: 'Alice',
      message: 'Looks good to me.',
      date: new Date().toISOString(),
      taskId: undefined,
    },
    {
      author: 'Bob',
      message: 'Please update the description.',
      date: new Date().toISOString(),
      taskId: undefined,
    },
  ]);

  commentForm = this.fb.nonNullable.group({
    message: ['', Validators.required],
  });

  submit() {
    const message = this.commentForm.getRawValue().message?.trim();
    if (!message) return;

    const user = this.authService.currentUser();
    const author = user?.username ?? 'Anonymous';

    const newComment: CommentItem = {
      author,
      message,
      date: new Date().toISOString(),
      taskId: this.taskId,
    };

    // Prepend the new comment locally
    this.comments.update((c) => [newComment, ...c]);

    // Reset the form (keep validators intact)
    this.commentForm.reset();
  }

  // Simple helper to format ISO date strings for the template
  formatDate(iso: string) {
    try {
      return new Date(iso).toLocaleString();
    } catch {
      return iso;
    }
  }

  // trackBy function for *ngFor to optimize rendering and to be used as a trackBy function in templates
  // Returns a stable identifier for each comment (we use the ISO date string).
  trackByDate(_index: number, item: CommentItem) {
    return item.date;
  }
}
