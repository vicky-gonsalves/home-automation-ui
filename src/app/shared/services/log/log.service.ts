import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private apiUrl: string = environment.apiUrl + 'logs';

  constructor(private http: HttpClient) {
  }

  public getLogs(options: { q?: string, page?: number, limit?: number, sort?: string[], fields?: string[] }): Observable<any> {
    let params = new HttpParams();
    for (const key in options) {
      if (key && options.hasOwnProperty(key)) {
        params = params.append(key, options[key]);
      }
    }
    this.updateLoading(true);
    return this.http.get<any>(`${this.apiUrl}`, {params})
      .pipe(
        tap(() => this.updateLoading(false)));
  }


  private updateLoading(flag: boolean): void {
  }
}
