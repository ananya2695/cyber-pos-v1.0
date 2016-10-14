import { Component } from '@angular/core';
import { NavController, Slides, NavParams } from 'ionic-angular';
import { PaymentPage } from '../payment/payment';
import { TablePage } from'../table/table';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'build/pages/productSell/productSell.html'
})

export class ProductSellPage {
  name_table: any;

  id_cus: any;
  user_name: any;
  fillterOrder: any = [];
  orders: any;
  products: any = [];
  basket: any = [];
  totalprice: any = 0.00;
  total: any = 0.00;
  box: any = [];
  mySlideOptions = {
    pager: true
  };
  mySlideVertical = {
    direction: 'vertical'
  };
  constructor(public navCtrl: NavController, public http: Http, public navParam: NavParams) {
    this.http.get('https://cyber-pos.herokuapp.com/products').map(res => {

      return res.json();

    }).subscribe(data => {

      console.log('Data object in subscribe method:');
      console.dir(data);
      this.products = data;
      console.log(this.products);
      let productPerPage = 12;
      let page = Math.ceil(this.products.length / productPerPage);
      let ii = 0;
      for (let i = 0; i < page; i++) {
        let pp = { page: i, products: [] };

        for (let j = 0; j < productPerPage; j++) {
          if (this.products[ii]) pp.products.push(this.products[ii]);
          ii++;
        }
        this.box.push(pp);
      }
      console.log(this.box);
    });


    //   this.name_table = navParam.get("name_table");
    //   this.id_cus = navParam.get("id_cus");
    //   this.user_name = navParam.get("user_name");
    // console.log(this.name_table);
    this.orders = navParam.get("item");
    console.log(this.orders.order);
    //this.fillterOrder =  this.orders.order;
    //console.log(this.fillterOrder);

    //  this.http.get('https://cyber-pos.herokuapp.com/orders').map(res => {

    //   return res.json();

    // }).subscribe(data => {

    //   console.log('Data object in subscribe method:');
    //   console.dir(data);
    //   this.orders = data;
    //   console.log(this.orders);
    //   for(let i =0;i< this.orders.length;i++){
    //     if(this.name_table == this.orders[i].name_table){
    //       this.fillterOrder.push(this.orders[i]);
    //     }

    //   }
    //   console.dir(this.fillterOrder);
    // });


  }
  PaymentPage() {
    this.navCtrl.push(PaymentPage, { "basket": this.basket, "totalprice": this.totalprice });
  }
  TablePage() {
    //this.navCtrl.push(TablePage);
    this.navCtrl.pop();
  }
  arrayIndexOf(myArr, key) {
    let result = -1;
    myArr.forEach(function (idx) {
      if (idx.id_pro == key.id_pro) result++;
    });
    return result;
  }

  chooseProduct(item) {
    console.log(item);
    if (this.arrayIndexOf(this.orders.order.list_order, item) != -1) {
      let selected = this.orders.order.list_order.filter(function (itm) {
        return itm.id_pro == item.id_pro;
      })[0];

      selected.piece++;
      this.totalprice += selected.totalPrice;
      this.total = selected.toTal;
    } else {
      
      item.piece = 1;
      item.totalPrice = item.price * item.piece;
      this.totalprice += item.totalPrice;
      this.orders.order.list_order.push(item);
      console.log(this.orders.order.list_order);
    }

  }
  slideProduct() {

  }
}
