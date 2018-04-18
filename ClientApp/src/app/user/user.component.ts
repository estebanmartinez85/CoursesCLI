import { Component, OnInit } from '@angular/core';
import {SirenEntity} from "../DTO/SirenEntity";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private userInfo: SirenEntity;
  private service: UserService;

  constructor(service: UserService){
    this.service = service;
  }

  private LoadUserInfo(): void {
    this.service.GetUserInfo().subscribe(entity => this.userInfo = entity);
  }

  ngOnInit() {
    this.LoadUserInfo();
  }
}
