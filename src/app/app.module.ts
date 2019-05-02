import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material';

import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ServiceWorkerModule} from '@angular/service-worker';
import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import {environment} from '../environments/environment';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ConfirmComponent} from './shared/components/dialogs/confirm/confirm.component';

const config: SocketIoConfig = {url: environment.domain, options: {}};

@NgModule({
  declarations: [
    AppComponent,
    ConfirmComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    MatDialogModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDividerModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmComponent]
})
export class AppModule {
}
