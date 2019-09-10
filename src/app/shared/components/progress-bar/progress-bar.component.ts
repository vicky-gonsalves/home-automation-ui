import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ProgressBarService} from '../../services/progress-bar/progress-bar.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit, OnDestroy {

  public showLoadingBar = false;
  private progressBarSubscription: Subscription;

  constructor() {
  }

  ngOnInit() {
    this.progressBarSubscription = ProgressBarService.isProgressive.subscribe(flag => {
      setTimeout(() => {
        this.showLoadingBar = flag;
      });
    });
  }

  ngOnDestroy(): void {
    if (this.progressBarSubscription) {
      this.progressBarSubscription.unsubscribe();
    }
  }

}
