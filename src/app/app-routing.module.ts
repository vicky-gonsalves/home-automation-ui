import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BedroomComponent} from './modules/bedroom/bedroom.component';
import {DashboardComponent} from './modules/dashboard/dashboard.component';
import {LogComponent} from './modules/log/log.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'logs',
    component: LogComponent
  },
  {
    path: 'bedroom',
    component: BedroomComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
