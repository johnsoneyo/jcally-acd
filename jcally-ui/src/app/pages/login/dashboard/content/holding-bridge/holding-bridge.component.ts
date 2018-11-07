import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AriproxyService } from '../../../../../services/ariproxy.service';
import { BridgeRequest } from '../../../../../datatransferobjects/bridge-request';
import { HoldingBridgeDatasource } from './holding.bridge.datasource';
import { WsnotifierService } from '../../../../../services/wsnotifier.service';
import { ToastrService } from 'ngx-toastr';
import { NotifierService } from '../../../../../services/notifier.service';
import { ITreeOptions, TREE_ACTIONS, TreeModel } from 'angular-tree-component';
import { TreeNode } from 'angular-tree-component/dist/defs/api';
import { PlaybackResponse } from '../../../../../datatransferobjects/playback.response';


@Component({
  selector: 'app-holding-bridge',
  templateUrl: './holding-bridge.component.html',
  styleUrls: ['./holding-bridge.component.css']
})
export class HoldingBridgeComponent implements OnInit {

  position = "right";
  isAdmin :  boolean = true;
  @Output()
  viewBridgeEmitter : EventEmitter<string>  = new EventEmitter();


  options: ITreeOptions = {
    actionMapping: {
      mouse: {
        click: (tree, node, $event) => {
        },
      }, allowDrag: (node) => {
        return true;
      }, allowDrop: (node) => {
        return true;

      }
    }
  };

  constructor(private ariProxy: AriproxyService, private toast: ToastrService,
    private wsnotifier: WsnotifierService, private notifier: NotifierService) { }

  ngOnInit() {
    this.ariProxy.getBridges('holding').subscribe(data => {
      this.dataSource = new HoldingBridgeDatasource(data);
    });
    this.notifier.notifyholdingBridgeCreation.subscribe(data => {
      this.dataSource = new HoldingBridgeDatasource(data);
    });

    this.notifier.notifyBridgeOfParticipants.subscribe(data => {
      this.ariProxy.getBridges('holding').subscribe(brgs => {
        this.dataSource = new HoldingBridgeDatasource(brgs);
      });
    });

  }


  displayedColumns: string[] = ['id', 'name', 'participants', 'actions'];
  dataSource: HoldingBridgeDatasource;

  onItemDrop(channelId, bridgeId) {
    this.ariProxy.
      addChannelToBridge(channelId, bridgeId)
      .subscribe(success => {

      }, error => {
        this.toast.
          error('channel could not be added to bridge at this time ');
      });

  }

  playMedia(id: string) {
    this.ariProxy.playmediaInBridge(id).subscribe(data => {
        this.toast.success('','playing beethoven in the  bridge');
    });
  }

  deleteBridge(id : string ){
    this.ariProxy.deleteBridge(id).subscribe(data =>{
      this.ariProxy.getBridges('holding').subscribe(data => {
        this.dataSource = new HoldingBridgeDatasource(data);
      });
    });
  }

  openBridgeNav(id : string){
    this.viewBridgeEmitter.next(id);
  }


}
