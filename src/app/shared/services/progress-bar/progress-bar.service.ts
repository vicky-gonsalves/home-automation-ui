import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {
  constructor() {
  }

  private static IS_PROGRESSIVE = new BehaviorSubject<boolean>(false);

  public static get isProgressive() {
    return ProgressBarService.IS_PROGRESSIVE;
  }

  public static updateLoading(flag: boolean) {
    ProgressBarService.IS_PROGRESSIVE.next(flag);
  }
}
