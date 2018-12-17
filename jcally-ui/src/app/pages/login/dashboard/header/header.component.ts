import { Component, OnInit, Input } from '@angular/core';
import { WebsocketService } from '../../../../services/websocket.service';
import { WsnotifierService } from '../../../../services/wsnotifier.service';
import { AuthService } from '../../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from '../../../../services/notifier.service';
import { User } from '../../../../datatransferobjects/user';
import { ThemePalette } from '@angular/material/core';
import { Subject } from 'rxjs';
import { AriproxyService } from '../../../../services/ariproxy.service';
import { UserActivity } from '../../../../datatransferobjects/user.activity';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public user: User;
  public active : true;
  public activities : UserActivity[]; 
  constructor(
    private route: ActivatedRoute,
    private ws: WsnotifierService,
    private notws: NotifierService,
    private w: WebsocketService,
    private auth: AuthService,
    private router: Router,
    private ariService: AriproxyService) {
    this.w.externalCreateObservableSocket();
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.ariService.getUserActivites().subscribe(data => {
      this.activities = data;
    });
  }

  logout() {
    this.notws.setLogout();
    setTimeout(() => {
      this.auth.logout();
      this.router.navigate(['/']);
    }, 4000);


  }

}
