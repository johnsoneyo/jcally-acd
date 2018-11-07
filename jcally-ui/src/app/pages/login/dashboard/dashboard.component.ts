import { Component, OnInit } from '@angular/core';
import { customer } from './customer';
import { PhoneService } from '../../../services/phone.service';
import { WebsocketService } from '../../../services/websocket.service';
import { Subject } from 'rxjs/Subject';
import { Subscriber } from 'rxjs/Subscriber';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  links = ['System Configuration','Dial Plan','Setup Message Schedule','Plan Customers Call'];
  
  public  customers = [{"id":174344,"fullname":"sharon marsh","phone":"070876512651","extension":"1000"},
  {"id":142433,"fullname":"eric cartman ","extension": "1000"},
  {"id":187544,"fullname":"stan mash ","extension": "1000"},
  {"id":197643,"fullname":"kenny mrcormick","extension":"1000"},
  {"id":174344,"fullname":"kyle  brovlaski","phone":"070876512651","extension":"1000"}];

  constructor(private phoneService : PhoneService) { 
   
  }

  ngOnInit() {
   
  }

  createChannel(extension : string):void{
    this.phoneService.originate(extension).
    subscribe(data => {
      console.log(data);
      
    });
  }

}
