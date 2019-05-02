import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Light} from '../../models/light';

@Injectable({
  providedIn: 'root'
})
export class LightService {

  currentLightStatus = this.socket.fromEvent<Light>('get-light:init');
  updatedLightStatus = this.socket.fromEvent<Light>('get-light:save');

  constructor(private socket: Socket) {
  }

  putLightStatus(data: any) {
    this.socket.emit('get-light:put', data);
  }
}
