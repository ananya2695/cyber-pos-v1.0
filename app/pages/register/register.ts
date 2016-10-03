import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegisterPage } from '../register/register';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController) {

  }
  Caramel = 0;
  clickOk(){
    this.navCtrl.push(RegisterPage);
  }
//   plusCoffi(){
// this.Caramel += 1;
//   }
//   delCoffi(){
//   this.Caramel -= 1;
// }
}