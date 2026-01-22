import { Component, DestroyRef, inject, signal } from '@angular/core';
import { UsersService } from '../../users/users-service';
import { User } from '../../../core/auth/interfaces/user';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-component-admin',
  imports: [],
  templateUrl: './component-admin.html',
  styleUrl: './component-admin.css',
})
export class ComponentAdmin {
  protected usersService = inject(UsersService);
  private destroyRef = inject(DestroyRef);

  users = signal<User[]>([]);
  alertMessage = signal<string>('');
  showAlert = false;

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.usersService
      .getAllUsers()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (tasks: User[]) => this.users.set(tasks),
        error: () => console.log('error'),
      });
  }

  btnBanUser(userInfo: User) {
    // On met à jour le WritableSignal<User[]> en filtrant sur l'id du user à bannir
    this.users.update((current) => current.filter((user) => user.id !== userInfo.id));

    // On set le message d'alert en le personalisant avec le username
    this.alertMessage.set(`L'utilisateur ${userInfo.username} à été banni`);

    // On set la variable d'affichage de l'alert à true
    this.showAlert = true;

    // On timout pour masquer et réinitialiser le contenu et l'affichage du message après 3 secondes
    setTimeout(() => {
      this.showAlert = false;
      this.alertMessage.set(``);
    }, 3000);
  }
}
