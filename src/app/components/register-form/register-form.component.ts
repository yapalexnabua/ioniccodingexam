import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Role } from 'src/app/interfaces/Role';
import { register } from 'src/app/state/auth/auth.actions';
import { confirmPasswordValidator } from 'src/app/validators/confirm-password.validator';

export const StrongPasswordRegx: RegExp =
  /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class RegisterFormComponent {
  fb = new FormGroup({
    email: new FormControl<string>('', [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
    ]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(StrongPasswordRegx)
    ]),
    confirmPassword: new FormControl<string>('', [
      Validators.required
    ]),
    role: new FormControl<Role>(Role.Admin, [
      Validators.required
    ])
  }, {
    validators: confirmPasswordValidator
  });

  isAlertOpen = false;
  alertButtons = ['OK'];
  roles = Object.values(Role);

  constructor(private store: Store) { }

  get form() {
    return this.fb.controls;
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  submit = () => {
    if (!this.fb.valid) {
      this.setOpen(true);
    } else {
      const { email, password, role } = this.fb.value;
      this.store.dispatch(register({ email: email!, password: password!, role: role! }));
    }
  }
}
