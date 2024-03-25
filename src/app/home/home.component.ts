import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  registeredValues: { name: string, username: string, mailid: string, age: number, password: string }[];
  onRegister(users: { name: string, username: string, mailid: string, age: number, password: string }[]) {
    this.registeredValues = users;
    console.log("data passing through home",users)
  }
}
