import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
  orders: any;
  totalprice: any = 0.00;
  cash: any = 0.00;
  money: any = [];
  nine: any = "";
  eight: any = "";
  seven: any = "";
  six: any = "";
  five: any = "";
  four: any = "";
  three: any = "";
  two: any = "";
  one: any = "";
  zero: any = "";
  zeroTwo: any = "";
  constructor(private navCtrl: NavController, public navParam: NavParams) {
    this.orders = navParam.get("orders");
    this.totalprice = navParam.get("totalprice");

  }
  ProductSell() {
    this.navCtrl.pop(ProductSellPage);
  }
  BackTable() {
    this.navCtrl.push(TablePage);
  }
  Cnine() {
    this.nine = 9;
    this.money.push(this.nine);
    var str = this.money.join("");
    this.cash = str;
    console.log(str);
  }
  Ceight() {
    this.eight = 8;
    this.money.push(this.eight);
    var str = this.money.join("");
    this.cash = str;
    console.log(str);
  }
  Cseven() {
    this.seven = 7;
    this.money.push(this.seven);
    //var sv = this.money.toString();
    var str = this.money.join("");
    this.cash = str;
    console.log(str);
    // this.money.replace(',','');
  }
  Csix() {
    this.six = 6;
    this.money.push(this.six);
    //var sx = this.money.toString();
    var str = this.money.join("");
    this.cash = str;
    console.log(str);
    //  this.money.replace(',','');
  }
  Cfive() {
    this.five = 5;
    this.money.push(this.five);
    var str = this.money.join("");
    this.cash = str;
    console.log(str);
  }
  Cfour() {
    this.four = 4;
    this.money.push(this.four);
    var str = this.money.join("");
    this.cash = str;
    console.log(str);
  }
  Cthree() {
    this.three = 3;
    this.money.push(this.three);
    var str = this.money.join("");
    this.cash = str;
    console.log(str);
  }
  Ctwo() {
    this.two = 2;
    this.money.push(this.two);
    var str = this.money.join("");
    this.cash = str;
    console.log(str);
  }
  Cone() {
    this.one = 1;
    this.money.push(this.one);
    var str = this.money.join("");
    this.cash = str;
    console.log(str);
  }
  Czero() {
    this.zero = 0;
    this.money.push(this.zero);
    var str = this.money.join("");
    this.cash = str;
    console.log(str);
  }
  CzeroTwo() {
    this.zeroTwo = "00";
    this.money.push(this.zeroTwo);
    var str = this.money.join("");
    this.cash = str;
    console.log(str);
  }
  cancel() {
    console.log(this.money);
    var str = this.money;
    str.pop();
    console.log(str);
    this.cash = str.join("");
    console.log(this.cash);
  }

}
