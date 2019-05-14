import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Bedroom} from '../../shared/models/bedroom';
import {BedroomService} from '../../shared/services/bedroom/bedroom.service';

@Component({
  selector: 'app-bedroom',
  templateUrl: './bedroom.component.html',
  styleUrls: ['./bedroom.component.scss']
})
export class BedroomComponent implements OnInit {
  title = 'Home Automation';
  bedroomStatus: Bedroom;
  online$: Observable<boolean>;
  frameUrl: any;

  constructor(private bedroomService: BedroomService, private sanitizer: DomSanitizer) {
    this.frameUrl = this.sanitizer.bypassSecurityTrustResourceUrl(environment.localBedroomHost);
  }

  ngOnInit() {
    this.bedroomService.bedroomStatus.subscribe((status: Bedroom) => {
      this.bedroomStatus = status;
      console.log(this.bedroomStatus);
    });

    this.bedroomService.updatedBedroomStatus.subscribe((status: Bedroom) => {
      this.bedroomStatus = status;
      console.log(this.bedroomStatus);
    });
  }

  changeLightMode(light: number, mode: boolean) {
    if (light === 2) {
      this.bedroomService.putBedroomStatus({light2: mode, updatedByDevice: false});
    }
    if (light === 4) {
      this.bedroomService.putBedroomStatus({fan: mode, updatedByDevice: false});
    }
  }
}

