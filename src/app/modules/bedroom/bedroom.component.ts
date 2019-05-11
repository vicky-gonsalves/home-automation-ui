import {Component, OnInit} from '@angular/core';
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

  constructor(private bedroomService: BedroomService) {
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
    if (light === 1) {
      this.bedroomService.putBedroomStatus({light1: mode, updatedByDevice: false});
    }
    if (light === 4) {
      this.bedroomService.putBedroomStatus({fan: mode, updatedByDevice: false});
    }
  }
}

