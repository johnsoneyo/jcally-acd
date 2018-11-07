import { CallLog } from "../../../../../datatransferobjects/call-log";
import { DataSource } from "@angular/cdk/table";
import { Observable } from "rxjs/Observable";

export class CallLogDatasource extends DataSource<any> {

    constructor(private msg: CallLog[]) {
        super();
    }

    connect(): Observable<CallLog[]> {
        return Observable.of(this.msg);
    }

    disconnect() { }

}