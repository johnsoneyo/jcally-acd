import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BridgeResponse } from '../datatransferobjects/bridge.response';
import { EndpointResponse } from '../datatransferobjects/endpoint.response';
import { channel } from '../pages/login/dashboard/content/channel';
import { User } from '../datatransferobjects/user';

@Injectable()
export class NotifierService {


  public subject = new Subject<string>();
  public removeChannel = new Subject<any>();
  public notifyholdingBridgeCreation = new Subject<any>();
  public notifymixingBridgeCreation = new Subject<any>();
  public toastMsg = new Subject<string>();
  public joinedChannel = new Subject<any>();
  public notifyTwoBridges = new Subject<any>();
  public notifyendpoints = new Subject<any>();
  public notifyBridgeOfParticipants = new Subject<any>();
  public notifyParticpantsLeavingChannel = new Subject<any>();
  public notifyChannels = new Subject<any>();
  public notifyUser = new Subject<any>();
  public viewBridgeDetail = new Subject<any>();
  

  constructor() { }

  setMessage(message: string) {
    this.subject.next(message);
  }

  setRemoveChannel(message: string) {
    this.removeChannel.next(message); 
  
  }

  setParticipantEnteredNotifier(channel : channel){
    this.notifyBridgeOfParticipants.next(channel);
  }

  setNotifyholdingOnBridgeCreation(response : BridgeResponse[]) {  
      this.notifyholdingBridgeCreation.next(response);
  }

  setNotifymixingOnBridgeCreation(response : BridgeResponse []) { 
      this.notifymixingBridgeCreation.next(response); 
  }

  setNotifyExtension(response : EndpointResponse[]){
    this.notifyendpoints.next(response);
  }
  
  setNotifyParticpantsLeavingChannel(channel : channel){
    this.notifyParticpantsLeavingChannel.next(channel);
  }

  setToastMsg(msg: string) {
    this.toastMsg.next(msg);
  }

  setNotifyChannels(channels : channel[]): any {
    this.notifyChannels.next(channels);
  }

  setNotifyUser(user : User){
     this.notifyUser.next(user);
  }

  setViewBridgeDetail(id : string){
    this.viewBridgeDetail.next(id);
  }

}
