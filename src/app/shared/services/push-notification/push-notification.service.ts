import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  SERVER_URL = `${environment.domain}/subscription`;

  constructor(private http: HttpClient) {
  }

  public sendSubscriptionToTheServer(subscription: PushSubscription) {
    return this.http.post(this.SERVER_URL, subscription);
  }
}
