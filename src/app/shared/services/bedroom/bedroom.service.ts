import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {Bedroom} from '../../models/bedroom';

@Injectable({
  providedIn: 'root'
})
export class BedroomService {
  private apiUrl: string = environment.localBedroomHost;
  bedroomStatus = this.socket.fromEvent<Bedroom>('bedroom:init');
  updatedBedroomStatus = this.socket.fromEvent<Bedroom>('bedroom:save');

  constructor(private socket: Socket,
              private http: HttpClient) {
  }

  putBedroomStatus(online: boolean, data: any) {
    if (online) {
      this.socket.emit('bedroom:put', data);
    } else {
      let action = '';
      if (data && data.fan === true) {
        action = 'fanon';
      }
      if (data && data.fan === false) {
        action = 'fanoff';
      }
      if (data && data.light2 === true) {
        action = 'light2on';
      }
      if (data && data.light2 === false) {
        action = 'light2off';
      }
      this.performLocalAction(action);
    }
  }

  public performLocalAction(action: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${action}`);
  }
}
