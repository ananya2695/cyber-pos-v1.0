import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { PaymentPage } from '../payment/payment';


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

  openPaymentPage(){
    this.navCtrl.push(PaymentPage);
  }
//   plusCoffi(){
// this.Caramel += 1;
//   }
//   delCoffi(){
//   this.Caramel -= 1;
// }
}