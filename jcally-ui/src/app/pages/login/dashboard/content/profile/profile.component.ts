import { Component, OnInit } from '@angular/core';
import { User } from '../../../../../datatransferobjects/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  passwordCard : boolean = false;
  user : User;
  userDetails : FormGroup;

  constructor() { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));

    this.userDetails = new FormGroup({
      fullname: new FormControl(this.user.fullname, [Validators.required]),
      username: new FormControl(this.user.username, [Validators.required]),
      password: new FormControl(this.user.password, [Validators.required]),
      email: new FormControl(this.user.email, [Validators.required]),
      phone: new FormControl(this.user.phone, [Validators.required])
    });
  }

  showPasswordCard(){
    if(!this.passwordCard){
      this.passwordCard= true;
    }else {
      this.passwordCard = false;
    }
  }

}
