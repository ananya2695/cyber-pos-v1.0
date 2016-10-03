import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PaymentPage } from '../payment/payment';



/*
  Generated class for the RegisterPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/register/register.html',
})
export class RegisterPage {

  constructor(private navCtrl: NavController) {

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

