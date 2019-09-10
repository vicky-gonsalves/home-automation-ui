import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {GetStatus} from '../../models/get-status';
import {ErrorMessageService} from '../error-message/error-message.service';
import {ProgressBarService} from '../progress-bar/progress-bar.service';

@Injectable({
  providedIn: 'root'
})
export class GetStatusService {
  private apiUrl: string = environment.apiUrl + 'get-statuses';


  currentStatus = this.socket.fromEvent<GetStatus>('get-status:init');
  updatedStatus = this.socket.fromEvent<GetStatus>('get-status:save');

  constructor(private socket: Socket, private http: HttpClient) {
  }

  putStatus(data: any) {
    this.socket.emit('get-status:put', data);
  }

  public getStatus(id: string): Observable<any> {
    this.updateLoading(true);
    return this.http.get<any>(`${this.apiUrl}/${id}`)
      .pipe(
        tap(() => this.updateLoading(false)),
        catchError(ErrorMessageService.handleServerErrorInternally<any>()));
  }

  private updateLoading(flag: boolean): void {
    ProgressBarService.updateLoading(flag);
  }
}
