import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { User } from 'src/app/interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  constructor(private storage: Storage) { }

  async ngOnInit() {
    await this.storage.create();
  }

  login = async ({ email, password }: { email: string; password: string; }): Promise<User> => {
    // simulate api call
    return (await this.storage.get('user')) || [];
  }
}
