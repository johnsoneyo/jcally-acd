import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AriproxyService } from '../../../../../services/ariproxy.service';
import { EndpointResponse } from '../../../../../datatransferobjects/endpoint.response';
import { NotifierService } from '../../../../../services/notifier.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-extension',
  templateUrl: './extension.component.html',
  styleUrls: ['./extension.component.css'],
  inputs: [],
  outputs:[]
})
export class ExtensionComponent implements OnInit {

  public currentChannel: {};

  endpoints: EndpointResponse[];
  @Output()
  page: EventEmitter<PageEvent>

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private service: NotifierService, private ariproxy: AriproxyService) {
    iconRegistry.addSvgIcon(
      'assistant',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/assistant.svg'));
    iconRegistry.addSvgIcon(
      'phone',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/phone.svg'));
    iconRegistry.addSvgIcon(
      'end_call',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/end_call.svg'));
  }
  ngOnInit() {
    this.ariproxy.getEndpoints().subscribe(data => {
      this.endpoints = data;
    });

    this.service.notifyChannels.subscribe(success=> {
      this.ariproxy.getEndpoints().subscribe(data => {
       this.endpoints = data;
      });
    });
  }

  dial(req: any) {
    this.ariproxy.originate(req).subscribe(data => { });
  }

 

}
