import { Component, OnInit } from '@angular/core';
import {User} from '../Model/User';
import {UserHttpServiceService} from '../user/user-http-service.service';

@Component({
  selector: 'connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  currentUser: User = new User();
  confirmPassword: string;
  verif: boolean = true;
  coUser : User= new User();
  connected

  constructor(private userService: UserHttpServiceService) { }

  ngOnInit() {}


  save(){
    this.userService.save(this.currentUser);
    // if(this.confirmPassword==this.currentUser.password) {
    //   this.userService.save(this.currentUser);
    //   this.cancel();
    // }else {
    //   this.verif = false;
    // }

  }
  cancel(){
    this.currentUser = new User();
  }

  connect() {
    console.log("je suis dans connexion component");
    console.log(this.coUser);
    this.userService.connect(this.coUser);
  }
}
