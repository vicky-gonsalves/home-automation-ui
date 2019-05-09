import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource, PageEvent} from '@angular/material';
import {Log} from '../../shared/models/log';
import {LogService} from '../../shared/services/log/log.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public displayedColumns = ['createdAt', 'action', 'motorOn', 'cutOff',
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

  constructor(private logService: LogService) {
  }

  ngOnInit() {
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
}
