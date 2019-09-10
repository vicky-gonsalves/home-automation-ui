import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public routeData: any = {
    hideNavBar: false,
    hideSideNav: true,
    hideHeader: false
  };

  constructor() {
  }


}
