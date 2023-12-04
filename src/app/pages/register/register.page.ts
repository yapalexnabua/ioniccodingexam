import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RegisterFormComponent } from 'src/app/components/register-form/register-form.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RegisterFormComponent]
})
export class RegisterPage implements OnInit {
  constructor() { }

  ngOnInit() {
  }
}
