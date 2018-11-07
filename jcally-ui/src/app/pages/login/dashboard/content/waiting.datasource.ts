import { Observable } from "rxjs/Observable";
import { DataSource } from "@angular/cdk/collections";
import 'rxjs/add/observable/of';
import { OnMessage } from "./onmessage";
import { channel } from "./channel";


export class WaitingDataSource extends DataSource<any> {


    constructor(private msg: channel[]) {
      super();
    }
  
    connect(): Observable<channel[]> {
      return  Observable.of(this.msg);
    }
  
    disconnect() {}

}