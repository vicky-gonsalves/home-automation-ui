import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';

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
