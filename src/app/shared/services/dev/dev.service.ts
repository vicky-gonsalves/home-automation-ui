import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Dev} from '../../models/dev';

@Injectable({
  providedIn: 'root'
})
export class DevService {

  devLogs = this.socket.fromEvent<Dev>('dev:save');

  constructor(private socket: Socket) {
  }
}
