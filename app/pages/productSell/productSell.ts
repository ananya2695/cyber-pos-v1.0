import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PaymentPage } from '../payment/payment';

@Component({
  templateUrl: 'build/pages/productSell/productSell.html'
})
export class ProductSellPage {
  constructor(public navCtrl: NavController) {

  }
   PaymentPage(){
   this.navCtrl.push(PaymentPage);
 }
}
