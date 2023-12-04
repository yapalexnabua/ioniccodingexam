import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { HorseFormComponent } from 'src/app/components/horse-form/horse-form.component';
import { selectUser } from 'src/app/state/auth/auth.selectors';
import { Role } from 'src/app/interfaces/Role';
import { HorseListComponent } from 'src/app/components/horse-list/horse-list.component';
import { AppState } from 'src/app/interfaces/AppState';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HorseFormComponent, HorseListComponent]
})
export class HomePage {
  public user$ = this.store.select(selectUser);
  readonly Role = Role;

  constructor(
    private store: Store<AppState>
  ) {}
}
