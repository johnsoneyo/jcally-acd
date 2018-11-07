import { Component, OnInit, Input } from '@angular/core';
import { WebsocketService } from '../../../../services/websocket.service';
import { WsnotifierService } from '../../../../services/wsnotifier.service';
import { AuthService } from '../../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from '../../../../services/notifier.service';
import { User } from '../../../../datatransferobjects/user';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public user: User;
  

  constructor(
    private route: ActivatedRoute,
    private ws: WsnotifierService,
    private w: WebsocketService,
    private auth: AuthService,
    private router: Router) {
    this.w.externalCreateObservableSocket();
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

}
