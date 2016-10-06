import { Component } from '@angular/core';
import { NavController ,NavParams } from 'ionic-angular';
import { ProductSellPage }  from'../productSell/productSell';
import { TablePage } from '../table/table';

/*
  Generated class for the PaymentPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/payment/payment.html',
})
export class PaymentPage {
  basket : any;
  totalprice :any = 0.00;
  constructor(private navCtrl: NavController , public navParam: NavParams) {
    this.basket = navParam.get("basket");
    this.totalprice = navParam.get("totalprice");
  }
  ProductSell(){
    this.navCtrl.pop(ProductSellPage);
  }
  BackTable(){
    this.navCtrl.push(TablePage);
  }
}
