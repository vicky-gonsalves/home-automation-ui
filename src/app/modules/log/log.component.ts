import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Dev} from '../../shared/models/dev';
import {GetStatus} from '../../shared/models/get-status';
import {Log} from '../../shared/models/log';
import {DevService} from '../../shared/services/dev/dev.service';
import {GetStatusService} from '../../shared/services/get-status/get-status.service';
import {LogService} from '../../shared/services/log/log.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  public displayedColumns = ['createdAt', 'action', 'motorOn', 'cutOff', 'quantity', 'flowRate',
    'automate', 'tankFilled', 'waterHeight', 'websocket', 'updatedByDevice', 'id'];
  public dataSource: MatTableDataSource<Log>;
  public paginatorOptions = {
    count: 0,
    pageSize: 10,
    pageSizeOptions: [5, 10, 25, 50, 100],
    showFirstLastButtons: true
  };
  public inProgress = true;
  private sortBy = '-createdAt';
  private pageSize = 10;
  currentStatus: GetStatus;
  devLog: Dev;

  constructor(private logService: LogService,
              private getStatusService: GetStatusService,
              private devService: DevService) {
  }

  ngOnInit() {
    this.getStatusService.currentStatus.subscribe((status: GetStatus) => {
      this.currentStatus = status;
    });
    this.getStatusService.updatedStatus.subscribe((status: GetStatus) => {
      this.currentStatus = status;
    });
    this.devService.devLogs.subscribe((log: Dev) => {
      this.devLog = log;
      console.log(this.devLog);
    });

    // Fetch Logs
    this.fetchLogListing();
  }

  public fetchLogListing(pageEvent?: PageEvent): void {
    if (pageEvent) {
      this.pageSize = pageEvent.pageSize;
    }
    const options = {
      limit: (pageEvent ? (pageEvent.pageSize) : this.pageSize ? this.pageSize : this.paginatorOptions.pageSize),
      page: (pageEvent ? (pageEvent.pageIndex + 1) : 1),
      sort: [this.sortBy]
    };
    this.inProgress = true;
    this.logService.getLogs(options)
      .subscribe(response => {
          console.log(response);
          if (response && response.rows && response.rows.length) {
            this.dataSource = new MatTableDataSource(response.rows);
            this.paginatorOptions.count = response.count;
          } else {
            console.log('no data');
          }
          this.inProgress = false;
        },
        err => {
          console.log(err);
          this.inProgress = false;
        });
  }

  changeDevLogs(mode: boolean) {
    this.getStatusService.putStatus({devLogs: mode, updatedByDevice: false});
  }

}
