import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Subject } from 'rxjs/Subject';
import { OnMessage } from '../pages/login/dashboard/content/onmessage';
import { AriproxyService } from './ariproxy.service';
import { BridgeRequest } from '../datatransferobjects/bridge-request';
import { BridgeResponse } from '../datatransferobjects/bridge.response';

@Injectable()
export class WsnotifierService {
  public subject = new Subject<string>();
  public removeChannel = new Subject<any>();
  public notifyholdingBridgeCreation = new Subject<any>();
  public notifymixingBridgeCreation = new Subject<any>();
  public toastMsg = new Subject<string>();


  constructor(private service: AriproxyService) { }

  setMessage(message: string) {
    this.subject.next(message);
  }

  setRemoveChannel(message: string) {
    this.removeChannel.next(message);
  }

  setNotifyholdingOnBridgeCreation(response : BridgeResponse[]) {
      this.notifyholdingBridgeCreation.next(response);
  }

  setNotifymixingOnBridgeCreation() {
    this.service.getBridges('mixing').subscribe(data => {
      this.notifymixingBridgeCreation.next(data);
    });

  }

 

  setToastMsg(msg: string) {
    this.toastMsg.next(msg);
  }


}
