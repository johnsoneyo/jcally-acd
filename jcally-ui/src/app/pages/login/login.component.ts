import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NotifierService } from '../../services/notifier.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials: FormGroup;
  public waiting : Boolean = false;

  constructor(
    private notifier: NotifierService,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService) {
    this.credentials = new FormGroup({
      username: new FormControl('johnson', [Validators.required]),
      password: new FormControl('johnson', [Validators.required])
    });
  }

  ngOnInit() {
  }


  login(cred) {
    this.waiting = true;
    this.auth.login(cred.value).subscribe(user => {
      this.auth.setLoggedIn(true);
      localStorage.setItem('user',JSON.stringify(user));
      if (this.auth.redirectUrl == undefined) {
        this.router.navigate(['/dashboard']);
        return;
      }
      this.router.navigate(['/dashboard']);
    }, error => {
      this.router.navigate(['/']);
      this.toastr.error('management user not found ');
      this.waiting = false;
    });

  }

}
