import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerData: FormGroup;
  registeredUsers: { name: string, username: string, mailid: string, age: number, password: string }[] = [];

  @Output() registerCarrier: EventEmitter<{ name: string, username: string, mailid: string, age: number, password: string }[]> = new EventEmitter();

  ngOnInit() {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/;
    const usernamePattern = /^(?=.*[0-9])[a-zA-Z0-9]+$/;

    this.registerData = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(3)]),
      username: new FormControl("", [Validators.required, Validators.minLength(3), Validators.pattern(usernamePattern)]),
      mailid: new FormControl("", [Validators.required, Validators.email]),
      age: new FormControl(18, [Validators.min(18), Validators.max(65)]),
      password: new FormControl("", [Validators.required, Validators.minLength(8), Validators.pattern(passwordPattern)])
    })
  }


  registerUser() {
    if (this.registerData.valid) {
      const data = this.registerData.value;
      this.registeredUsers.push(data);
      this.registerCarrier.emit(this.registeredUsers);
      console.log('Registration Successful');
      this.registerData.reset(); // Reset the form after successful registration
    } else {
      alert('Please check the fields');
    }
  }
}