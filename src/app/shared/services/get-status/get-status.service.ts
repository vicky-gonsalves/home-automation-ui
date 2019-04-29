import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {GetStatus} from '../../models/get-status';

@Injectable({
  providedIn: 'root'
})
export class GetStatusService {

  currentStatus = this.socket.fromEvent<GetStatus>('get-status:init');
  updatedStatus = this.socket.fromEvent<GetStatus>('get-status:save');

  constructor(private socket: Socket) {
  }

  putStatus(data: any) {
    this.socket.emit('get-status:put', data);
  }
}
