import { Injectable } from '@angular/core';
import { AriproxyService } from './ariproxy.service';
import { User } from '../datatransferobjects/user';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  constructor(private ariService: AriproxyService) { }
  isLoggedIn = JSON.parse(localStorage.getItem('loggedIn') || 'false')

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(credentials): Observable<User> {
    return this.ariService.login(credentials);
  }

  setLoggedIn(value: boolean) {
    this.isLoggedIn = value;
    localStorage.setItem('loggedIn', this.isLoggedIn);
  }

  getLoggedIn() {
    return JSON.parse(localStorage.getItem('loggedIn') || this.isLoggedIn);
  }

  logout(): void {
    this.isLoggedIn = false;
    localStorage.setItem('loggedIn', 'false');
  }


}
