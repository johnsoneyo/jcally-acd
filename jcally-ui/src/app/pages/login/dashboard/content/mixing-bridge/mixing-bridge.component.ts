import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AriproxyService } from '../../../../../services/ariproxy.service';
import { WsnotifierService } from '../../../../../services/wsnotifier.service';
import { MixingBridgeDatasource } from './mixing.bridge.datasource';
import { BridgeRequest } from '../../../../../datatransferobjects/bridge-request';
import { NotifierService } from '../../../../../services/notifier.service';
import { ITreeOptions, TreeModel, TREE_ACTIONS, TreeComponent } from 'angular-tree-component';
import { TreeNode } from 'angular-tree-component/dist/defs/api';
import { CallLog } from '../../../../../datatransferobjects/call-log';

@Component({
  selector: 'app-mixing-bridge',
  templateUrl: './mixing-bridge.component.html',
  styleUrls: ['./mixing-bridge.component.css']
})
export class MixingBridgeComponent implements OnInit {

  @ViewChild(TreeComponent)
  private tree: TreeComponent;

  isAdmin = true;

  constructor(private ariProxy: AriproxyService, private toast: ToastrService,
    private wsnotifier: WsnotifierService, private notifier: NotifierService) { }

  ngOnInit() {
    this.ariProxy.getBridges('mixing').subscribe(data => {
      this.dataSource = new MixingBridgeDatasource(data);
    });

    this.notifier.notifymixingBridgeCreation.subscribe(data => {
      this.dataSource = new MixingBridgeDatasource(data);
    });

    this.notifier.notifyBridgeOfParticipants.subscribe(data => {
      this.ariProxy.getBridges('mixing').subscribe(brgs => {
        this.dataSource = new MixingBridgeDatasource(brgs);
      });
    });

  }

  nodes = [
    { children: [] }];

  options: ITreeOptions = {
    actionMapping: {
      mouse: {
        click: (tree, node, $event) => {
          console.log($event);
        },
        drop: (tree: TreeModel, node: TreeNode, $event: any, { from, to }) => {
          let channelId;
          if (from.data == undefined) {
            channelId = from.id;

          } else {
            channelId = from.data.id;
          }
          if ($event.target.dataset.bridgeid == undefined) {
            return;
          }

          this.ariProxy.addChannelToBridge(channelId, $event.target.dataset.bridgeid).subscribe(data => {
            this.notifier.setNotifyParticpantsLeavingChannel(undefined);

          }, error => {
            this.toast.error('', 'Channel cannot be added ');
          });


        }
      }, allowDrag: (node) => {
        return true;
      }, allowDrop: (node) => {
        return true;

      }
    }
  };

  displayedColumns: string[] = ['id', 'name', 'participants', 'actions'];
  dataSource: MixingBridgeDatasource;


  stasisEvent = {
    ChannelEnteredBridge: (message) => {
      this.toast.success('', "channel " + message.channel.id + " has entered the " + message.bridge.bridge_type + " bridge ");
      this.notifier.setRemoveChannel(message.channel.id);
      this.notifier.setParticipantEnteredNotifier(message.channel);
    },
    ChannelLeftBridge: (message) => {
      this.notifier.setNotifyParticpantsLeavingChannel(message.channel);
    },
    StasisEnd: () => { return },
    ChannelHangupRequest: () => { return }
  }



  deleteBridge(id: string) {
    this.ariProxy.deleteBridge(id).subscribe(data => {
      this.ariProxy.getBridges('mixing').subscribe(data => {
        this.dataSource = new MixingBridgeDatasource(data);
      });
    });
  }



}
