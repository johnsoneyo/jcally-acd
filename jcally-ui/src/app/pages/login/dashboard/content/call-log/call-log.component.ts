import { Component, OnInit } from '@angular/core';
import { AriproxyService } from '../../../../../services/ariproxy.service';
import { CallLogDatasource } from './calllog-datasource';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-call-log',
  templateUrl: './call-log.component.html',
  styleUrls: ['./call-log.component.css']
})
export class CallLogComponent implements OnInit {

  constructor(private ariproxy: AriproxyService) { }

  displayedColumns: string[] = ['source', 'destination','date', 'startTime', 'endTime', 'noOfParticipants', 'duration'];
  dataSource: CallLogDatasource;

   // MatPaginator Output
  pageEvent: PageEvent;

  ngOnInit() {
    this.ariproxy.getCallLogs(0).subscribe(data => {
      this.dataSource = new CallLogDatasource(data);
    });

  }

  pageEventChange($event){
    this.ariproxy.getCallLogs($event.pageIndex).subscribe(data => {
      this.dataSource = new CallLogDatasource(data);
    });
  }
  

}
