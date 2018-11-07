import { BridgeResponse } from "../../../../../datatransferobjects/bridge.response";
import { Observable } from "rxjs/Observable";
import { DataSource } from "@angular/cdk/table";

export class HoldingBridgeDatasource extends DataSource<any> {
    constructor(private msg: BridgeResponse[]) {
        super();
      }
    
      connect(): Observable<BridgeResponse[]> {
        return  Observable.of(this.msg);
      }
    
      disconnect() {}
  

}