import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { BridgeRequest } from '../../../../../datatransferobjects/bridge-request';
import { AriproxyService } from '../../../../../services/ariproxy.service';
import { ToastrService } from 'ngx-toastr';
import { WsnotifierService } from '../../../../../services/wsnotifier.service';
import { NotifierService } from '../../../../../services/notifier.service';

@Component({
  selector: 'app-savebridge',
  templateUrl: './savebridge.component.html',
  styleUrls: ['./savebridge.component.css']
})
export class SavebridgeComponent implements OnInit {

  bridge: FormGroup;
  errorMsg: string;

  constructor(
    public dialogRef: MatDialogRef<SavebridgeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private service: AriproxyService,
    private notifier: NotifierService) { }

  ngOnInit() {
    this.bridge = new FormGroup({
      type: new FormControl(''),
      name: new FormControl('')
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

   lookup = {
    holding: () => { 
      return this.service.getBridges('holding').subscribe(data => {
        this.notifier.setNotifyholdingOnBridgeCreation(data);
      });

    }, mixing: () => { 
      return this.service.getBridges('mixing').subscribe(data => {
        this.notifier.setNotifymixingOnBridgeCreation(data);
      });
    }
  }



  saveBridge({ value, valid }: { value: BridgeRequest, valid: Boolean }) {

    this.service.saveBridge(value).subscribe(success => {
      this.dialogRef.close();
      this.lookup[value.type]();
    }, error => {
      this.notifier.setToastMsg(' Service not reachable ');
    });
  }


}
