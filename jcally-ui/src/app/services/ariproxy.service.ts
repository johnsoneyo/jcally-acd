import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BridgeRequest } from '../datatransferobjects/bridge-request';
import { BridgeResponse } from '../datatransferobjects/bridge.response';
import { EndpointResponse } from '../datatransferobjects/endpoint.response';
import { WsnotifierService } from './wsnotifier.service';
import { NotifierService } from './notifier.service';
import { Payload } from '../datatransferobjects/payload';
import { channel } from '../pages/login/dashboard/content/channel';
import { PlaybackResponse } from '../datatransferobjects/playback.response';
import { User } from '../datatransferobjects/user';
import { CallLog } from '../datatransferobjects/call-log';
import { environment } from '../../environments/environment';
import { stringify } from 'querystring';
import { UserActivity } from '../datatransferobjects/user.activity';

@Injectable()
export class AriproxyService {

  host: string = environment.arihost;
  port: string = environment.ariport;
  user: User;

  saveBridge(bridge: BridgeRequest): Observable<any> {
    let preHeader = {
      'userId': '',
      'Content-Type': 'application/json'
    };
    preHeader['userId'] = this.user.id.toString();
    let options = {
      headers: new HttpHeaders(preHeader)
    };

    return this.http.post('http://' + this.host + ':' + this.port + '/ari-proxy/bridges', bridge, options);
  }
  constructor(private http: HttpClient, private notifier: NotifierService) {

    this.user = JSON.parse(localStorage.getItem('user'));

    this.getBridges('mixing').subscribe(data => {
      this.notifier.setNotifymixingOnBridgeCreation(data);
    });

    this.getChannels().subscribe(data => {
      this.notifier.setNotifyChannels(data);
    });

  }


  getBridges(type: string): Observable<BridgeResponse[]> {
    let options = {
      params: {
        "type": type
      }
    };
    return this.http.
      get<BridgeResponse[]>('http://' + this.host + ':' + this.port + '/ari-proxy/bridges', options);
  }

  getBridge(id: string): Observable<BridgeResponse> {
    return this.http.
      get<BridgeResponse>('http://' + this.host + ':' + this.port + '/ari-proxy/bridges/' + id);
  }

  addChannelToBridge(channelId: string, bridgeId: string): Observable<any> {
    let preHeader = {
      'userId': '',
      'Content-Type': 'application/json'
    };
    preHeader['userId'] = this.user.id.toString();
    let options = {
      headers: new HttpHeaders(preHeader)
    };
    return this.http.
      post('http://' + this.host + ':' + this.port + '/ari-proxy/bridges/' + bridgeId + '/' + channelId, options);
  }

  getEndpoints(): Observable<EndpointResponse[]> {
    return this.http.
      get<EndpointResponse[]>('http://' + this.host + ':' + this.port + '/ari-proxy/endpoints').map(res => {
        return res.filter(e => e.resource != 'public');
      })

  }


  removeChannelFromBridge(channelId: string, bridgeId: string): Observable<any> {
    let preHeader = {
      'userId': '',
      'Content-Type': 'application/json'
    };
    preHeader['userId'] = this.user.id.toString();
    let options = {
      headers: new HttpHeaders(preHeader)
    };
    return this.http.
      post('http://' + this.host + ':' + this.port + '/ari-proxy/bridges/' + bridgeId + '/' + channelId, options);
  }


  originate(payload: Payload): Observable<any> {

    let p = new Payload();
    p.extension = "1000";
    p.callerId = "crm-0001";
    p.timeout = 120;
    p.app = "hello-world";
    p.endpoint = payload.technology + "/" + payload.resource;

    let preHeader = {
      'userId': '',
      'Content-Type': 'application/json'
    };
    preHeader['userId'] = this.user.id.toString();
    const httpOptions = {
      headers: new HttpHeaders(preHeader)
    };

    return this.http.post('http://' + this.host + ':' + this.port + '/ari-proxy/channels', p, httpOptions);
  }

  getChannels(): Observable<channel[]> {
    return this.http.
      get<channel[]>('http://' + this.host + ':' + this.port + '/ari-proxy/channels')
  }

  answerChannel(channelId): Observable<any> {

    let preHeader = {
      'userId': '',
      'Content-Type': 'application/json'
    };
    preHeader['userId'] = this.user.id.toString();
    let httpOptions = {
      headers: new HttpHeaders(preHeader)
    };
    return this.http.
      post('http://' + this.host + ':' + this.port + '/ari-proxy/channels/' + channelId + '/answer', httpOptions);
  }

  ringChannel(channelId): Observable<any> {

    let preHeader = {
      'userId': '',
      'Content-Type': 'application/json'
    };
    preHeader['userId'] = this.user.id.toString();
    let httpOptions = {
      headers: new HttpHeaders(preHeader)
    };
    return this.http.
      post('http://' + this.host + ':' + this.port + '/ari-proxy/channels/' + channelId + '/ring', httpOptions);
  }

  playmediaInBridge(bridgeId: string): Observable<PlaybackResponse> {
    return this.http.
      get<PlaybackResponse>('http://' + this.host + ':' + this.port + '/ari-proxy/bridges/' + bridgeId + '/playmedia');
  }

  login(user): Observable<User> {
    let preHeader = {
      'userId': '',
      'Content-Type': 'application/json'
    };
    preHeader['userId'] = this.user.id.toString();
    let httpOptions = {
      headers: new HttpHeaders(preHeader)
    };
    return this.http.post<User>('http://' + this.host + ':' + this.port + '/auth', user, httpOptions);
  }

  createCallog(log: CallLog): Observable<CallLog> {
    let preHeader = {
      'userId': '',
      'Content-Type': 'application/json'
    };
    preHeader['userId'] = this.user.id.toString();
    let httpOptions = {
      headers: new HttpHeaders(preHeader)
    };
    return this.http.post<CallLog>('http://' + this.host + ':' + this.port + '/ari-proxy/calls', log, httpOptions);
  }

  updateCallog(log: CallLog): Observable<CallLog> {
    let preHeader = {
      'userId': '',
      'Content-Type': 'application/json'
    };
    preHeader['userId'] = this.user.id.toString();
    let httpOptions = {
      headers: new HttpHeaders(preHeader)
    };
    return this.http.put<CallLog>('http://' + this.host + ':' + this.port + '/ari-proxy/calls', log, httpOptions);
  }

  getCallLogs(pageNo: number): Observable<CallLog[]> {
    return this.http.get<any>('http://' + this.host + ':' + this.port + '/ari-proxy/calls/' + pageNo);
  }

  deleteBridge(bridgeId: string): Observable<any> {
    let preHeader = {
      'userId': '',
      'Content-Type': 'application/json'
    };
    preHeader['userId'] = this.user.id.toString();
    let httpOptions = {
      headers: new HttpHeaders(preHeader)
    };
    return this.http.delete('http://' + this.host + ':' + this.port + '/ari-proxy/bridges/' + bridgeId, httpOptions);
  }

  getUserActivites(): Observable<UserActivity[]> {
    let preHeader = {
      'userId': '',
      'Content-Type': 'application/json'
    };
    preHeader['userId'] = this.user.id.toString();
    let httpOptions = {
      headers: new HttpHeaders(preHeader)
    };
    return this.http.get<any>('http://' + this.host + ':' + this.port + '/ari-proxy/useractivities',httpOptions);
  }

}
