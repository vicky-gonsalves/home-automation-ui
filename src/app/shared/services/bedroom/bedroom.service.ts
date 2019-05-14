import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Bedroom} from '../../models/bedroom';

@Injectable({
  providedIn: 'root'
})
export class BedroomService {
  bedroomStatus = this.socket.fromEvent<Bedroom>('bedroom:init');
  updatedBedroomStatus = this.socket.fromEvent<Bedroom>('bedroom:save');

  constructor(private socket: Socket) {
  }

  putBedroomStatus(data: any) {
    this.socket.emit('bedroom:put', data);
  }
}
