import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {SwPush} from '@angular/service-worker';
import {ConfirmComponent} from './shared/components/dialogs/confirm/confirm.component';
import {Dev} from './shared/models/dev';
import {GetStatus} from './shared/models/get-status';
import {Light} from './shared/models/light';
import {DevService} from './shared/services/dev/dev.service';
import {GetStatusService} from './shared/services/get-status/get-status.service';
import {LightService} from './shared/services/light/light.service';
import {PushNotificationService} from './shared/services/push-notification/push-notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Automatic Tank & Lights System';
  currentStatus: GetStatus;
  devLog: Dev;
  currentLightStatus: Light;
  showStateButton = true;
  public tankForm: FormGroup;
  VAPID_PUBLIC_KEY = 'BEJp0Car3wMy9KIBpAwZYJXvmtDynRAUO5FH21f-kD2KDdszayFkoQH7vavJcPmKr_3qO_QSp6mO1AsUi2XavkQ';


  constructor(private getStatusService: GetStatusService,
              private devService: DevService,
              private lightService: LightService,
              private dialog: MatDialog,
              private pushService: PushNotificationService,
              swPush: SwPush) {
    if (swPush.isEnabled) {
      console.log('Notifications enabled');
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
    this.devService.devLogs.subscribe((log: Dev) => {
      this.devLog = log;
      console.log(this.devLog);
    });

    this.getStatusService.updatedStatus.subscribe((status: GetStatus) => {
      this.currentStatus = status;
      console.log(this.currentStatus);
    });

    this.lightService.currentLightStatus.subscribe((light: Light) => {
      this.currentLightStatus = light;
      this.toggleAllLightsStatus();
      console.log(this.currentLightStatus);
    });
    this.lightService.updatedLightStatus.subscribe((light: Light) => {
      this.currentLightStatus = light;
      this.toggleAllLightsStatus();
      console.log(this.currentLightStatus);
    });

    this.tankForm = new FormGroup({
      state: new FormControl('', []),
      mode: new FormControl('', []),
      light1: new FormControl('', []),
      light2: new FormControl('', []),
      light3: new FormControl('', []),
      light4: new FormControl('', []),
      allLights: new FormControl('', []),
      otaMode: new FormControl('', []),
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
          this.getStatusService.putStatus({motor: state, automate: false, updatedByDevice: false});
        } else {
          this.showStateButton = false;
          setTimeout(() => {
            this.showStateButton = true;
          });
        }
      });
    } else {
      this.getStatusService.putStatus({motor: state, automate: false, updatedByDevice: false});
    }

  }

  changeMotorMode(mode: boolean) {
    this.getStatusService.putStatus({motor: 'off', automate: mode, updatedByDevice: false});
  }

  changeCutoffMode() {
    this.getStatusService.putStatus({skipCutoff: !this.currentStatus.skipCutoff, updatedByDevice: false});
  }

  changeLightMode(light: number, mode: boolean) {
    if (light === 1) {
      this.lightService.putLightStatus({light1: mode, updatedByDevice: false});
    }
    if (light === 2) {
      this.lightService.putLightStatus({light2: mode, updatedByDevice: false});
    }
    if (light === 3) {
      this.lightService.putLightStatus({light3: mode, updatedByDevice: false});
    }
    if (light === 4) {
      this.lightService.putLightStatus({light4: mode, updatedByDevice: false});
    }
    if (light === 5) {
      this.lightService.putLightStatus({light1: mode, light2: mode, light3: mode, light4: mode, updatedByDevice: false});
    }
  }

  changeOTAMode(mode: boolean) {
    this.lightService.putLightStatus({flag: mode});
  }

  toggleAllLightsStatus() {
    this.currentLightStatus.allLights = this.currentLightStatus && this.currentLightStatus.light1 &&
      this.currentLightStatus.light2 && this.currentLightStatus.light3 && this.currentLightStatus.light4;
  }

}
