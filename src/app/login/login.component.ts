import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginData: FormGroup;

  @Input() userData: { name: string, username: string, mailid: string, age: number, password: string }[];
  //users: { name: string, username: string, mailid: string, age: number, password: string }[] = [];

  mailid: string;
  password: string;

  ngOnInit(): void {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/;
    this.loginData = new FormGroup({
      mailid: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(8), Validators.pattern(passwordPattern)])
    });
  }

  loginForm(): void {
    this.mailid = this.loginData.get('mailid').value;
    this.password = this.loginData.get('password').value;

    let flag = false;
    for (const user of this.userData) {
      if (user.mailid === this.mailid && user.password === this.password) {
        console.log('Login successful');
        flag = true;
        break;
      }
    }
    if (!flag) {
      console.log('Invalid email or password');
    }
  }
}
