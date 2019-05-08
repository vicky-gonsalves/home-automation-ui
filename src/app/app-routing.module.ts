import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LogComponent} from './modules/log/log.component';

const routes: Routes = [
  {
    path: 'logs',
    component: LogComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
