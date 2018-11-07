import { Component, OnInit } from '@angular/core';
import { WsnotifierService } from '../../../../../services/wsnotifier.service';
import { OnMessage } from '../onmessage';
import { WaitingDataSource } from '../waiting.datasource';
import { AriproxyService } from '../../../../../services/ariproxy.service';
import { ToastrService } from 'ngx-toastr';
import { NotifierService } from '../../../../../services/notifier.service';
import { channel } from '../channel';
import { CallLog } from '../../../../../datatransferobjects/call-log';

@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.component.html',
  styleUrls: ['./waiting.component.css']
})
export class WaitingComponent implements OnInit {

  constructor(private wsnotifier: WsnotifierService,
    private ariservice: AriproxyService,
    private notifier: NotifierService,
    private toast: ToastrService) {
    this.messages = [];
  }

  position = "right";

  messages: OnMessage[];
  channels: channel[];
  displayedColumns: string[] = ['status', 'position', 'name', 'number', 'weight', 'time', 'symbol'];
  dataSource: WaitingDataSource;
  greencicle: string = "assets/img/green.png";
  redcicle: string = "assets/img/red.png";



  ngOnInit() {
    let state = { up: "Up", ring: "Ring" }

    this.wsnotifier.subject.map(x => { return JSON.parse(x); }).subscribe(msg => {
      //check for new statis event
      console.log(msg);
      if (msg.type != undefined)
        this.stasisEvent[msg.type](msg);
    });

    this.notifier.notifyChannels.subscribe((chs: channel[]) => {
      this.channels = chs.filter(ch => ch.state == state.ring || ch.state == state.up);
      this.dataSource = new WaitingDataSource(this.channels);
    });

    this.notifier.removeChannel.subscribe(id => {
      this.toast.info("channel " + id + " added to holding bridge", '');
      this.ariservice.getBridges('holding').subscribe(data => {
        this.notifier.notifyholdingBridgeCreation.next(data);
      });
    });
  } //


  stasisEvent = {

    StasisStart: (message) => {
      this.channelState[message.channel.state](message);
      this.ariservice.getChannels().subscribe(data => {
        this.notifier.setNotifyChannels(data);
      });
    },
    ChannelVarset: () => { },
    ApplicationReplaced: () => { console.log('application started'); },
    ChannelEnteredBridge: (message) => {
      //  this.notifier.setRemoveChannel(message.channel.id);
      this.notifier.setParticipantEnteredNotifier(message);
      // take call log when channel size equals 2
      if (message.bridge.channels.length == 1 && message.bridge.bridge_type === 'mixing') {
        let log = new CallLog();
        log.startTime = new Date();
        log.source = "01-2708987";
        log.destination = "04-6754465";
        log.noOfParticipants = 2;
        log.channels = [message.bridge.channels[0],'tweek-channel-id'].join();
        this.ariservice.createCallog(log).subscribe(data => {

        });
      }

    },
    ChannelLeftBridge: (message) => {
      this.notifier.setNotifyParticpantsLeavingChannel(message.channel);
      //check if bridge has one more channel left 
      if (message.bridge.channels.length < 2 && message.bridge.bridge_type === 'mixing') {
        let log = new CallLog();
        log.endTime = new Date();
        log.channels = message.channel.id;
        this.ariservice.updateCallog(log).subscribe(data => {

        });
      }
    },
    StasisEnd: () => {
      this.ariservice.getChannels().subscribe(data => {
        this.notifier.setNotifyChannels(data);
      });
      this.ariservice.getBridges('holding').subscribe(data => {
        this.notifier.setParticipantEnteredNotifier(undefined);
      });

    },
    ChannelHangupRequest: () => { return },
    ChannelStateChange: (message) => {
      if (message.channel.state == 'Up')
        this.ariservice.getEndpoints().subscribe(data => {
          this.notifier.setNotifyExtension(data);
        });
    },
    ChannelDestroyed: () => {
      this.ariservice.getChannels().subscribe(data => {
        this.notifier.setNotifyChannels(data);
      });
    }
    ,
    PlaybackStarted: (msg) => {

    },
    PlaybackFinished: (msg) => {
      this.toast.info('', 'music playback finished in bridge  ' + msg.playback.target_uri);
    },
    BridgeDestroyed: (msg) => {

    }
  }

  channelState = {
    Ring: (message) => {
      this.toast.success('', 'an inbound channel from a customer just entered the waiting list');
    },
    Up: (message) => {
      this.toast.info('', 'an outbound channel from a customer care agent just entered the waiting list');

    }
  }



  answerChannel(channelId: string) {
    this.ariservice.answerChannel(channelId).subscribe(data => {
      this.ariservice.getChannels().subscribe(result => {
        this.notifier.setNotifyChannels(result);
      });
    });
  }



}

