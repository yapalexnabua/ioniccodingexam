import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Horse } from 'src/app/interfaces/Horse';

@Injectable({
  providedIn: 'root'
})
export class HorseService implements OnInit {

  constructor(
    private storage: Storage
  ) { }

  async ngOnInit() {
    await this.storage.create();
  }

  getHorses = async (): Promise<Horse[]> => {
    // simulate api call
    return (await this.storage.get('horses')) || [];
  }
}
