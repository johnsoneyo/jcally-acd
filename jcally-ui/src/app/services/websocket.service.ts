import { Injectable } from '@angular/core';
import { Subscriber } from 'rxjs/Subscriber';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { WsnotifierService } from './wsnotifier.service';
import { OnMessage } from '../pages/login/dashboard/content/onmessage';

@Injectable()
export class WebsocketService {

  constructor(private wsnotifier: WsnotifierService) {
   }

  private ws: WebSocket;

  createObservableSocket(url: string): void {
    this.ws = new WebSocket(url);

    setTimeout(() => {
      if (this.ws.readyState != 1) {
        return new Subject().error('not connected');
      }
    }, 3000);


    this.ws.onmessage = event => this.wsnotifier.setMessage(event.data);
    this.ws.onerror = event => this.wsnotifier.setMessage("{}");
    this.ws.onopen = event => {
      this.wsnotifier.setMessage("{}");

    }

  }

  externalCreateObservableSocket():void {
    this.createObservableSocket('ws://localhost:8088/ari/events?api_key=asterisk:asterisk&app=hello-world');
   }

}
