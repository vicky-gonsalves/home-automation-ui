import {Component, OnInit} from '@angular/core';
import {fromEvent, merge, Observable, of} from 'rxjs';
import {mapTo} from 'rxjs/operators';
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

  constructor(private bedroomService: BedroomService) {
    this.online$ = merge(
      of(navigator.onLine),
      fromEvent(window, 'online').pipe(mapTo(true)),
      fromEvent(window, 'offline').pipe(mapTo(false))
    );
    this.online$.subscribe(ree => {
      console.log(ree);
    });
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
    const online = this.bedroomStatus.websocket === 'connected';
    let action = '';
    if (online && this.online$) {
      if (light === 2) {
        this.bedroomService.putBedroomStatus({light2: mode, updatedByDevice: false});
      }
      if (light === 4) {
        this.bedroomService.putBedroomStatus({fan: mode, updatedByDevice: false});
      }
    } else {
      if (light === 2 && mode === true) {
        action = 'light2on';
      } else if (light === 2 && mode === false) {
        action = 'light2off';
      } else if (light === 4 && mode === true) {
        action = 'fanon';
      } else if (light === 4 && mode === false) {
        action = 'fanoff';
      }
      this.bedroomService.performLocalAction(action).subscribe(response => {
        console.log(response);
        this.bedroomStatus = response;
      });
    }
  }
}

