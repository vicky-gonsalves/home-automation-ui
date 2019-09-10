import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {SettingComponent} from '../dialogs/setting/setting.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  showSettings() {
    const conf: MatDialogConfig = {
      autoFocus: false,
      closeOnNavigation: true,
      panelClass: 'panelClass',
      maxWidth: '1400px'
    };
    this.dialog.open(SettingComponent, conf);
  }

}
