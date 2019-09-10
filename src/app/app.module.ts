import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatDividerModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ServiceWorkerModule} from '@angular/service-worker';
import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import {environment} from '../environments/environment';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BedroomComponent} from './modules/bedroom/bedroom.component';
import {DashboardComponent} from './modules/dashboard/dashboard.component';
import {LogComponent} from './modules/log/log.component';
import {ConfirmComponent} from './shared/components/dialogs/confirm/confirm.component';
import {SettingComponent} from './shared/components/dialogs/setting/setting.component';
import {NavbarComponent} from './shared/components/navbar/navbar.component';
import {ProgressBarComponent} from './shared/components/progress-bar/progress-bar.component';

const config: SocketIoConfig = {url: environment.domain, options: {}};

@NgModule({
  declarations: [
    AppComponent,
    ConfirmComponent,
    LogComponent,
    DashboardComponent,
    BedroomComponent,
    NavbarComponent,
    SettingComponent,
    ProgressBarComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    MatDialogModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatProgressBarModule,
    MatTableModule,
    MatCardModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatPaginatorModule,
    MatInputModule,
    MatSnackBarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmComponent,
    SettingComponent]
})
export class AppModule {
}
