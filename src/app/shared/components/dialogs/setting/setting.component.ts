import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {GetStatus} from '../../../models/get-status';
import {ErrorMessageService} from '../../../services/error-message/error-message.service';
import {GetStatusService} from '../../../services/get-status/get-status.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  public settingsForm: FormGroup;
  public inProgress = false;
  public submitted = false;
  public settings = {maxMotorOnTime: 30};


  constructor(private dialogRef: MatDialogRef<SettingComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private errorMessageService: ErrorMessageService,
              private getStatusService: GetStatusService,
  ) {
  }

  ngOnInit() {
    this.getStatusService.updatedStatus.subscribe((status: GetStatus) => {
      this.settings.maxMotorOnTime = status.maxMotorOnTime;
      this.setValue();
    });

    this.fetchSettings();
    this.setupForm();
  }

  get maxMotorOnTime() {
    return this.settingsForm.get('maxMotorOnTime');
  }

  private fetchSettings() {
    this.inProgress = true;
    this.getStatusService.getStatus('status')
      .subscribe(response => {
          if (response) {
            this.settings.maxMotorOnTime = response.maxMotorOnTime;
            this.setValue();
          } else {
            this.errorMessageService.openSnackBar(this.errorMessageService.getNonFormError('NO_DATA'));
          }
          this.inProgress = false;
        },
        err => {
          this.errorMessageService.handleServerErrors(err);
          this.inProgress = false;
        });
  }

  private setInProgress(): void {
    this.settingsForm.disable();
    this.inProgress = true;
  }

  private setNotInProgress(): void {
    this.inProgress = false;
    this.settingsForm.enable();
  }

  private setupForm(): void {
    this.settingsForm = new FormGroup({
      maxMotorOnTime: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.pattern(/^[\d]+$/)
      ])
    });
  }

  submitSettingsForm() {
    this.submitted = true;
    this.settings = this.prepareFormFields();
    console.log(this.settings);
    if (this.settingsForm.valid) {
      this.setInProgress();
      this.getStatusService.putStatus({maxMotorOnTime: this.settings.maxMotorOnTime, updatedByDevice: false});
      this.errorMessageService.openSnackBar('Settings successfully updated.', 5000, 'OK');
      this.dismissModal();
    }
  }

  private prepareFormFields() {
    const formModel = this.settingsForm.value;
    return {
      maxMotorOnTime: formModel.maxMotorOnTime
    };
  }

  private setValue(): void {
    setTimeout(() => {
      this.settingsForm.patchValue({
        maxMotorOnTime: this.settings.maxMotorOnTime
      });
    });
  }

  public getErrorMessage(fieldName: string): string {
    return this.errorMessageService.getError(this[fieldName], fieldName);
  }

  dismissModal() {
    this.dialogRef.close(false);
  }

}
