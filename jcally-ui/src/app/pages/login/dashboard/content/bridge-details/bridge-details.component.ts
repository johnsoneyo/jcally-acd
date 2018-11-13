import { Component, OnInit } from '@angular/core';
import { NotifierService } from '../../../../../services/notifier.service';
import { AriproxyService } from '../../../../../services/ariproxy.service';
import { BridgeResponse } from '../../../../../datatransferobjects/bridge.response';

@Component({
  selector: 'app-bridge-details',
  templateUrl: './bridge-details.component.html',
  styleUrls: ['./bridge-details.component.css']
})
export class BridgeDetailsComponent implements OnInit {

  constructor(private notfie: NotifierService, private ariproxy: AriproxyService) { }
  public panelOpenState : boolean = true;
 
  public bridge : BridgeResponse = new BridgeResponse();
  ngOnInit() {
    this.notfie.viewBridgeDetail.subscribe(data => {
      this.ariproxy.getBridge(data).subscribe(success => {
        console.log(success);
        this.bridge = success;     
      });
    });
  }

}
