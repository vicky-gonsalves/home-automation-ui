import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketInitService {

  constructor(private socket: Socket) {
  }

  connect(msg: string) {
    this.socket.emit('get-status:put', msg);
  }

  getMessage() {
    return this.socket
      .fromEvent('get-status:save')
      .pipe();
  }
}
