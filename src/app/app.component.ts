import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {SwPush} from '@angular/service-worker';
import {ConfirmComponent} from './shared/components/dialogs/confirm/confirm.component';
import {GetStatus} from './shared/models/get-status';
import {GetStatusService} from './shared/services/get-status/get-status.service';
import {PushNotificationService} from './shared/services/push-notification/push-notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Automatic Tank System';
  currentStatus: GetStatus;
  showStateButton = true;
  public tankForm: FormGroup;
  VAPID_PUBLIC_KEY = 'BEJp0Car3wMy9KIBpAwZYJXvmtDynRAUO5FH21f-kD2KDdszayFkoQH7vavJcPmKr_3qO_QSp6mO1AsUi2XavkQ';


  constructor(private getStatusService: GetStatusService,
              private dialog: MatDialog,
              private pushService: PushNotificationService,
              swPush: SwPush) {
    if (swPush.isEnabled) {
      swPush
        .requestSubscription({
          serverPublicKey: this.VAPID_PUBLIC_KEY,
        })
        .then(subscription => {
          pushService.sendSubscriptionToTheServer(subscription).subscribe();
        })
        .catch(console.error);
    }
  }

  get state() {
    return this.tankForm.get('state');
  }

  get mode() {
    return this.tankForm.get('mode');
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

  changeMotorState(state: string, e) {
    if (state === 'on') {
      const conf: MatDialogConfig = {
        autoFocus: false,
        closeOnNavigation: true,
        panelClass: 'panelClass',
        maxWidth: '320px'
      };
      const dialogRef = this.dialog.open(ConfirmComponent, conf);
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.getStatusService.putStatus({motor: state, automate: false});
        } else {
          this.showStateButton = false;
          setTimeout(() => {
            this.showStateButton = true;
          });
        }
      });
    } else {
      this.getStatusService.putStatus({motor: state, automate: false});
    }

  }

  changeMotorMode(mode: boolean) {
    this.getStatusService.putStatus({motor: 'off', automate: mode});
  }

}
