import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {GetStatus} from './shared/models/get-status';
import {GetStatusService} from './shared/services/get-status/get-status.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Tank System';
  currentStatus: GetStatus;
  public tankForm: FormGroup;

  constructor(private getStatusService: GetStatusService) {
  }

  get state() {
    return this.tankForm.get('state');
  }

  ngOnInit() {
    this.getStatusService.currentStatus.subscribe((status: GetStatus) => {
      this.currentStatus = status;
      console.log(this.currentStatus);
    });
    this.getStatusService.updatedStatus.subscribe((status: GetStatus) => {
      this.currentStatus = status;
      console.log(this.currentStatus);
    });

    this.tankForm = new FormGroup({
      state: new FormControl('', []),
      mode: new FormControl('', []),
    });
  }

  changeMotorState() {
    const status = this.currentStatus && this.currentStatus.motor && this.currentStatus.motor === 'on' ? 'off' : 'on';
    this.getStatusService.putStatus({motor: status, automate: false});
  }

  changeMotorMode() {
    const mode = !(this.currentStatus && this.currentStatus.hasOwnProperty('automate') && this.currentStatus.automate);
    this.getStatusService.putStatus({motor: 'off', automate: mode});
  }

}
