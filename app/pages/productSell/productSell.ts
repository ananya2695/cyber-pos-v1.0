import { Component } from '@angular/core';
import { NavController, Slides, NavParams, ModalController, ViewController, AlertController} from 'ionic-angular';
import { PaymentPage } from '../payment/payment';
import { TablePage } from'../table/table';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'build/pages/productSell/productSell.html'
})
export class ProductSellPage {
  returnMessage = "";
  fillterCate = [];
  name_table: any;
  uuid: any;
  id_cus: any;
  user_name: any;
  id_order: any;
  time_cus: any;
  fillterOrder: any = [];
  orders: any;
  products: any = [];
  basket: any = [];
  totalPrice: any = 0.00;
  totalprice: any = 0.00;
  total: any = 0.00;
  _id: any;
  ids: any;
  box: any = [];
  boxcate: any = [];
  mySlideOptions = {
    pager: true
  };
  mySlideVertical = {
    direction: 'vertical'
  };
  constructor(public navCtrl: NavController, public http: Http,
    public navParam: NavParams, public modalCtrl: ModalController, public alertCtrl: AlertController) {
    this.uuid = navParam.get('uuid');


    this.http.get('https://cyber-pos.herokuapp.com/products').map(res => {

      return res.json();

    }).subscribe(data => {

      console.log('Data object in subscribe method:');
      console.dir(data);
      this.products = data;
      console.log(this.products);
      var flags = [], output = [], l = this.products.length, i;
      for (i = 0; i < l; i++) {
        if (flags[this.products[i].cate]) continue;
        flags[this.products[i].cate] = true;
        output.push(this.products[i].cate);
        this.fillterCate = output;
        console.log(this.fillterCate);
      }

      let productPerCate = 6;
      let pageCate = Math.ceil(this.fillterCate.length / productPerCate);
      let ii2 = 0;
      for (let i = 0; i < pageCate; i++) {
        let pp = { pageCate: i, fillterCate: [] };

        for (let j = 0; j < productPerCate; j++) {
          if (this.fillterCate[ii2]) pp.fillterCate.push(this.fillterCate[ii2]);
          ii2++;
        }
        this.boxcate.push(pp);
      }
      console.log(this.boxcate);

      this.basket = this.products.filter(function (el) {
        return (el.cate === 'Drink');
      });
      console.log(this.basket);
      this.box = [];
      let productPerPage = 12;
      let page = Math.ceil(this.basket.length / productPerPage);
      let ii = 0;
      for (let i = 0; i < page; i++) {
        let pp = { page: i, basket: [] };

        for (let j = 0; j < productPerPage; j++) {
          if (this.basket[ii]) pp.basket.push(this.basket[ii]);
          ii++;
        }
        this.box.push(pp);
      }
      console.log(this.box);
    });

    this.orders = navParam.get("item");
    console.log(this.orders.order);

    this.id_cus = "-";
    this.orders.order.id_cus = this.id_cus;

    if (!this.orders.order.id_order) {
      this.id_order = 'O-' + this.uuid.slice(0, 8);
      console.log(this.id_order);
      this.orders.order.id_order = this.id_order;
    }



    var today = new Date();
    var dd = today.getDate();
    console.log(dd);
    var mm = today.getMonth() + 1;
    console.log(mm);
    var yyyy = today.getFullYear();
    console.log(yyyy);
    this.time_cus = dd + '/' + mm + '/' + yyyy;
    this.orders.order.time_cus = this.time_cus;
    console.log(this.orders.order.time_cus);

    if (!this.orders.order.totalPrice) {
      this.orders.order.totalPrice = 0;
    }

  }
  CancelOrder() {
    if (this.orders.order._id) {
      this.http.delete('https://cyber-pos.herokuapp.com/orders/' + this.orders.order._id).map(res => {

        return res.json();

      }).subscribe(data => {
        console.dir(data);
      });
    }

    console.log(this.orders.order);
    this.navCtrl.push(TablePage, { 'user_name': this.orders.order.user_name });
  }

  PaymentPage() {
    this.orders.order.list_order.forEach(element => {
      element.totalprice = element.piece * element.price;
      console.log(element.totalprice);

    });
    this.navCtrl.push(PaymentPage, { "orders": this.orders, "totalPrice": this.totalPrice });
  }
  TablePage() {

    if (!this.orders.order._id) {
      this.orders.order.list_order.forEach(element => {
        element.totalprice = element.piece * element.price;
        console.log(element.totalprice);

      });
      let product = this.orders.order.list_order;
      console.log(product);
      let body = {
        'id_cus': this.orders.order.id_cus, 'id_order': this.orders.order.id_order,
        'name_table': this.orders.order.name_table, 'time_cus': this.orders.order.time_cus,
        'totalPrice': this.orders.order.totalPrice, 'user_name': this.orders.order.user_name,
        'list_order': product, 'paid': false
      };

      console.dir(body);
      this.http.post('https://cyber-pos.herokuapp.com/orders', body).map(res => {
        return res.json();

      }).subscribe(data => {
        console.dir(data);
        this.returnMessage = data.message;
        console.log(this.returnMessage);

        this.http.get('https://cyber-pos.herokuapp.com/orders').map(res => {

          return res.json();

        }).subscribe(data2 => {
          console.dir(data2);
          for (let i = 0; i < data2.length; i++) {
            if (data._id == data2[i]._id) {
              this.orders.order._id = data2[i]._id;
              console.log(this.orders.order._id);
              break;
            }
          }
        });

      });


    } else if (this.orders.order._id) {
      this.orders.order.list_order.forEach(element => {
        element.totalprice = element.piece * element.price;
        console.log(element.totalprice);

      });
      let product = this.orders.order.list_order;
      console.log(product);
      let body = {
        '_id': this.orders.order._id, 'id_cus': this.orders.order.id_cus, 'id_order': this.orders.order.id_order,
        'name_table': this.orders.order.name_table, 'time_cus': this.orders.order.time_cus,
        'totalPrice': this.orders.order.totalPrice, 'user_name': this.orders.order.user_name,
        'list_order': product, 'paid': false
      };

      console.dir(body);
      this.http.put('https://cyber-pos.herokuapp.com/orders/' + this.orders.order._id, body).map(res => {
        return res.json();

      }).subscribe(data => {
        console.dir(data);
        this.returnMessage = data.message;
        console.log(this.returnMessage);
      });
    }
    //this.navCtrl.pop();

    console.log(this.orders.order);
    this.navCtrl.push(TablePage, {});
    this.navCtrl.remove(2, 3);

  }

  arrayIndexOf(myArr, key) {
    let result = -1;
    myArr.forEach(function (idx) {
      if (idx.id_pro == key.id_pro) result++;
    });
    return result;
  }

  chooseProduct(item, obj) {
    console.log(item);

    obj = this.orders.order.totalPrice;
    console.log(obj);
    if (obj) {
      if (this.arrayIndexOf(this.orders.order.list_order, item) != -1) {
        let selected = this.orders.order.list_order.filter(function (itm) {
          return itm.id_pro == item.id_pro;
        })[0];
        selected.piece++;
        obj += selected.totalprice;
        this.orders.order.totalPrice = obj;
        this.total = selected.toTal;
        console.log(selected.totalprice);

      } else {
        item.piece = 1;
        item.totalprice = item.price * item.piece;
        console.log(item.totalprice);
        obj += item.totalprice;
        this.orders.order.totalPrice = obj;
        console.log(this.orders.order.totalPrice);
        this.orders.order.list_order.push(item);
        console.log(this.orders.order.list_order);
      }
    } else {
      if (this.arrayIndexOf(this.orders.order.list_order, item) != -1) {
        let selected = this.orders.order.list_order.filter(function (itm) {
          return itm.id_pro == item.id_pro;
        })[0];
        selected.piece++;
        this.totalPrice += selected.totalprice;
        this.orders.order.totalPrice = this.totalPrice;
        this.total = selected.toTal;
        console.log(selected.totalprice);

      } else {
        item.piece = 1;
        item.totalprice = item.price * item.piece;
        console.log(item.totalprice);
        this.totalPrice += item.totalprice;
        this.orders.order.totalPrice = this.totalPrice;
        console.log(this.orders.order.totalPrice);
        this.orders.order.list_order.push(item);
        console.log(this.orders.order.list_order);
      }
    }
  }
  delOrder(item) {
    let OrderItm = this.orders.order.list_order;
    console.log(OrderItm);
    for (var i = 0; i < OrderItm.length; i++) {
      if (OrderItm[i]._id == item._id) {
        this.orders.order.totalPrice = this.orders.order.totalPrice - (OrderItm[i].totalprice * OrderItm[i].piece);
        this.totalPrice = this.orders.order.totalPrice;
        OrderItm.splice(i, 1);
        break;
      }
    }
    console.log(OrderItm);
  }
  chooseCate(cate) {
    console.log(this.orders.order);
    console.log(cate);
    this.basket = this.products.filter(function (el) {
      return (el.cate === cate);
    });
    console.log(this.basket);
    this.box = [];
    let productPerPage = 12;
    let page = Math.ceil(this.basket.length / productPerPage);
    let ii = 0;
    for (let i = 0; i < page; i++) {
      let pp = { page: i, basket: [] };

      for (let j = 0; j < productPerPage; j++) {
        if (this.basket[ii]) pp.basket.push(this.basket[ii]);
        ii++;
      }
      this.box.push(pp);
    }
    console.log(this.box);
  }
  ConfirmOr() {
    let confirm = this.alertCtrl.create({
      title: 'แจ้งเตือน',
      message: `คุณต้องการลบสินค้าทั้งหมดใช่หรือไม่`,
      buttons: [
        {
          text: 'ยกเลิก',
          handler: () => {
          }
        },
        {
          text: 'ตกลง',
          handler: () => {
            if (this.orders.order._id) {
              this.http.delete('https://cyber-pos.herokuapp.com/orders/' + this.orders.order._id).map(res => {

                return res.json();

              }).subscribe(data => {
                console.dir(data);
              });
            }
            console.log(this.orders.order);
            this.navCtrl.push(TablePage, { 'user_name': this.orders.order.user_name });
          }
        }
      ]
    });
    confirm.present();
  }
}