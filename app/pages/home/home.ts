import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProductSellPage } from '../productSell/productSell';
@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController) {

  }
  ProductSell(){
    this.navCtrl.push(ProductSellPage);
  }
}
