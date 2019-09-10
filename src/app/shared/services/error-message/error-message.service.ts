import {Injectable} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {Observable} from 'rxjs';
import {ProgressBarService} from '../progress-bar/progress-bar.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {

  private STATUS_ERRORS = {
    DEFAULT: 'Something is not right. Please retry after some time.'
  };

  private NON_FORM_ERRORS = {
    NO_EDIT_ACCESS: 'You don\'t have access to edit',
    NO_VALID_RESPONSE: 'Oops.. something is just not right! Please try again later.',
    NO_DATA: 'No results found.',
    NOT_ALLOWED_FOR_INPUT: 'Cannot fetch sample transactions for input.'
  };

  private ERRORS = {
    id: {
      required: 'Please enter id',
      pattern: 'Please enter only alphanumeric characters',
      minlength: 'Id should be min 1 and max 35 chars long',
      maxlength: 'Id should be min 1 and max 35 chars long',
      email: 'Please enter a valid email id'
    },
    name: {
      required: 'Please enter name',
      minlength: 'Name should be min 1 and max 100 chars long',
      maxlength: 'Name should be min 1 and max 100 chars long',
      pattern: 'Name should be alphabetic'
    },
    owner_id: {
      required: 'Please choose valid owner id or create new one'
    },
    effective_date: {
      required: 'Please choose effective date'
    },
    searchInput: {
      required: 'Please enter search query'
    },
    balance: {
      required: 'Please enter balance',
      pattern: 'Only decimals are allowed with a precision of 2'
    },
    min_prefund_req_amount: {
      required: 'Please enter minimum pre-funded amount',
      pattern: 'Only decimals are allowed with a precision of 2'
    },
    alertmark: {
      required: 'Please enter alert cap',
      min: 'Alert cap should be between 0 to 100',
      max: 'Alert cap should be between 0 to 100',
      pattern: 'Only decimals are allowed with a precision of 2'
    },
    resetalertmark: {
      required: 'Please enter reset alert cap',
      min: 'Reset alert cap should be between 0 to 100',
      max: 'Reset alert cap should be between 0 to 100',
      pattern: 'Only decimals are allowed with a precision of 2'
    },
    email: {
      required: 'Please enter email id',
      email: 'Please enter valid email id',
      pattern: 'Please enter valid email id'
    },
    firstName: {
      required: 'Please enter first name',
      minlength: 'First name should be min 1 and max 100 chars long',
      maxlength: 'First name should be min 1 and max 100 chars long',
      pattern: 'First name should be alphabetic'
    },
    lastName: {
      required: 'Please enter last name',
      minlength: 'Last name should be min 1 and max 100 chars long',
      maxlength: 'Last name should be min 1 and max 100 chars long',
      pattern: 'Last name should be alphabetic'
    },
    contactProfile_id: {
      required: 'Please choose contact profile'
    },
    role_id: {
      required: 'Please choose role'
    },
    participant_id: {
      required: 'Please choose participant'
    },
    password: {
      required: 'Please enter password',
      pattern: 'Password must have of 1 uppercase, 1 lowercase, 1 number, 1 symbol from !@#$&* and minimum 8 characters',
      matchPassword: 'Passwords doesn\'t match'
    },
    confirmPassword: {
      required: 'Please confirm password',
      matchPassword: 'Passwords doesn\'t match'
    },
    oldPassword: {
      required: 'Please enter old password'
    },
    short_id: {
      required: 'Please enter short id',
      maxlength: 'Short Id should be min 1 and max 15 chars long',
      pattern: 'Short Id should be alphanumeric'
    },
    default_connection_id: {
      required: 'Please select default connection id'
    },
    settlementAccount: {
      required: 'Please select settlement account'
    },
    privileges: {
      required: 'Please select privileges'
    },
    privilegesChips: {
      required: 'Please select privileges'
    },
    template_type: {
      required: 'Please select template type'
    },
    template_name: {
      required: 'Please enter template name',
      pattern: 'Only alphanumeric characters and hyphens are allowed',
      minlength: 'Template name should be min 1 and max 18 chars long',
      maxlength: 'Template name should be min 1 and max 18 chars long'
    },
    testcase_name: {
      required: 'Please select test case name'
    },
    field_name: {
      required: 'Please select field name'
    },
    field_value: {
      required: 'Please enter field value',
      pattern: 'Only alphanumeric, underscores, dots, brackets, colons, single quotes and dashes are allowed',
      minlength: 'Field value should be min 1 and max 100 chars long',
      maxlength: 'Field value should be min 1 and max 100 chars long'
    },
    criteria_name: {
      required: 'Please enter criteria name',
      pattern: 'Only alphanumeric, hyphens and whitespace characters are allowed',
      minlength: 'Criteria name should be min 1 and max 35 chars long',
      maxlength: 'Criteria name should be min 1 and max 35 chars long'
    },
    criteria_type: {
      required: 'Please select criteria type'
    },
    criteria_description: {
      required: 'Please enter criteria description',
      minlength: 'Criteria description should be min 1 and max 500 chars long',
      maxlength: 'Criteria description should be min 1 and max 500 chars long'
    },
    template_names_chips: {
      required: 'Please select template names'
    },
    transaction_type: {
      required: 'Please select transaction type',
      invalidSelection: 'Please choose valid transaction type'
    },
    instruction_id: {
      required: 'Please enter instruction id',
      invalid: 'Instruction id invalid',
      minlength: 'Instruction id invalid',
      format: 'First 8 characters should represent date or should start with `M` and 2-9 characters should represent date'
    },
    transaction_create_frm_date: {
      required: 'Please enter transaction creation from date',
      dateRange: 'Transaction creation from date range should be within n hours',
      dateRangeLower: 'From date/time should be less than To date/time'
    },
    frm_date: {
      required: 'Please enter snapshot creation from date',
      dateRange: 'Snapshot creation from date range should be within n hours',
      dateRangeLower: 'From date should be less than To date'
    },
    transaction_create_frm_time: {
      required: 'Please enter transaction creation from time',
      dateRange: 'Transaction creation to date range should be within n hours',
      dateRangeLower: 'From date/time should be less than To date/time'
    },
    transaction_create_to_date: {
      required: 'Please enter transaction creation to date',
      dateRange: 'Transaction creation to date range should be within n hours'
    },
    to_date: {
      required: 'Please enter snapshot creation to date',
      dateRange: 'Snapshot creation to date range should be within n hours'
    },
    transaction_create_to_time: {
      required: 'Please enter transaction creation to time',
      owlDateTimeMin: 'Transaction creation to time cannot be less than transaction creation from time'
    },
    role: {
      required: 'Please select your role'
    },
    creditor_participant_id: {
      required: 'Please select creditor participant id',
      invalidSelection: 'Please choose valid creditor participant id'
    },
    debtor_participant_id: {
      required: 'Please select debtor participant id',
      invalidSelection: 'Please choose valid debtor participant id'
    },
    creditor_routing_id: {
      required: 'Please select creditor routing id',
      invalidSelection: 'Please choose valid creditor routing id'
    },
    debtor_routing_id: {
      required: 'Please select debtor routing id',
      invalidSelection: 'Please choose valid debtor routing id'
    },
    creditor_account_id: {
      pattern: 'Only alphanumeric characters and dashes are allowed',
      minlength: 'Creditor account number should be min 1 and max 35 chars long',
      maxlength: 'Criteria account number should be min 1 and max 35 chars long'
    },
    debtor_account_id: {
      pattern: 'Only alphanumeric characters and dashes are allowed',
      minlength: 'Debtor account number should be min 1 and max 35 chars long',
      maxlength: 'Debtor account number should be min 1 and max 35 chars long'
    },
    op_type: {
      required: 'Please select operation type'
    },
    amount: {
      required: 'Please enter amount',
      pattern: 'Only decimals are allowed with a precision of 2'
    },
    checkbox: {
      required: 'Please select atleast one checkbox'
    },
    account_type: {
      required: 'Please select account type'
    },
    max_transaction_limit: {
      required: 'Please enter max transaction limit',
      pattern: 'Only decimals are allowed with a precision of 2'
    },
    msg_set_version: {
      required: 'Please enter message set version',
      pattern: 'Only stings allowed matching pattern 1.0.0 or a.b.c'
    },
    echo_conn_unavailable_mark_duration: {
      required: 'Please enter unavailable mark duration',
      min: 'Unavailable mark duration should be greater than 0'
    },
    echo_interval: {
      required: 'Please enter unavailable echo interval',
      min: 'Echo interval should be greater than 0'
    },
    duration: {
      required: 'Please enter run duration value',
      min: 'Run duration should be greater than 0',
      atLeastOne: 'Either Run duration or Run iterations value must be provided',
      pattern: 'Run duration must be an integer'
    },
    iterations: {
      required: 'Please enter run iterations value',
      min: 'Run iterations should be greater than 0',
      atLeastOne: 'Either Run duration or Run iterations value must be provided',
      pattern: 'Run iterations must be an integer'
    },
    weightage: {
      min: 'Weightage should be greater than 0',
      pattern: 'Weightage must be an integer'
    },
    criteria_name_dropdown: {
      required: 'Criteria name is mandatory'
    },
    msg_type: {
      required: 'Message type is mandatory'
    },
    timeout_offset: {
      required: 'Timeout Offset is mandatory',
      pattern: 'Timeout Offset must be an integer',
      min: 'Timeout Offset should be greater than or equal to 0'
    },
    request_interval: {
      required: 'Please enter request interval value',
      min: 'Request interval should be greater than or equal to 0',
      pattern: 'Request interval must be an integer'
    },
    maxMotorOnTime: {
      required: 'Please enter time in minutes for maximum motor should remain ON',
      pattern: 'Maximum motor on time must be a number',
      min: 'Maximum motor on time must be greater than 0'
    },
  };

  constructor(public snackBar: MatSnackBar) {
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   */
  public static handleServerErrorInternally<T>() {
    return (errors: any): Observable<T> => {
      let err = null;
      if (errors && errors.error) {
        err = errors.error;
      } else if (errors && !errors.error) {
        err = errors;
      }
      // TODO: send the error to remote logging infrastructure
      console.error(errors); // log to console instead

      // TODO: better job of transforming error for user consumption
      ErrorMessageService.log(err);

      // Update Progress bar
      ProgressBarService.updateLoading(false);

      return new Observable(subscriber => subscriber.error(err));
    };
  }

  /** Log message */
  public static log(error: any) {
    // Log error to some service for error logging
  }

  public getError(formField: FormControl, fieldName: string, customError?: string): string {
    if (formField.hasError('remote')) {
      return formField.errors['remote'];
    }
    for (const key in this.ERRORS[fieldName]) {
      if (formField.hasError(key) || (formField.errors && formField.errors.hasOwnProperty(key) && formField.errors[key])) {
        return customError ? customError : this.ERRORS[fieldName][key];
      }
    }
  }

  public getNonFormError(key: string): string {
    return this.NON_FORM_ERRORS[key];
  }

  /*Usage: this.errorMsgService.setError(this.email, 'remote error');*/
  public setError(formField: AbstractControl, errorString: string): void {
    formField.setErrors({remote: errorString});
  }

  public handleServerErrors(err: any, form?: FormGroup, resetCaptcha: Boolean = false): void {
    if (err && err.hasOwnProperty('error') && err.error && err.error.length && form) {
      err.error.forEach(e => e.param && e.message ? this.setFormError(form, e.param, e.message, resetCaptcha) : null);
    } else if (err && err.length && form) {
      err.forEach(e => e.param && e.message ? this.setFormError(form, e.param, e.message, resetCaptcha) : null);
    } else {
      if (err && err.hasOwnProperty('code') && err.code) {
        switch (err.code) {
          case 401:
            this.openSnackBar(err.msg || this.STATUS_ERRORS['UNAUTH'] || err.msg, 5000);
            break;
          case 404:
            this.openSnackBar(err.msg || this.STATUS_ERRORS['DEFAULT'], 5000);
            break;
          case 500:
            this.openSnackBar(err.msg || this.STATUS_ERRORS['DEFAULT'], 10000);
            break;
          default:
            this.openSnackBar(this.STATUS_ERRORS['DEFAULT'], 5000);
            break;
        }
        if (resetCaptcha) {
          this.resetCaptcha(form);
        }
      } else {
        this.forceErrorPopup((err && err.msg) ? err.msg : (err && err.length && err[0].message) ? err[0].message : null);
      }
    }
  }

  public openSnackBar(message: string, duration: number = 2000, action: string = 'OK'): void {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }

  private setFormError(form: FormGroup, param: string, message: string, resetCaptcha: Boolean) {
    if (param === 'captcha' || resetCaptcha) {
      this.resetCaptcha(form);
    }
    return form.get(param) ? this.setError(form.get(param), message) : this.forceErrorPopup(message);
  }

  private resetCaptcha(form: FormGroup): void {
    form.get('captcha').reset();
    form.get('captcha').setErrors(null);
  }

  private forceErrorPopup(message?: string): void {
    this.openSnackBar(message || this.STATUS_ERRORS['DEFAULT'], 5000);
  }
}
