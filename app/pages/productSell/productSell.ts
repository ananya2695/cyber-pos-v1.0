import { Component } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import { PaymentPage } from '../payment/payment';
import { TablePage } from'../table/table';

@Component({
  templateUrl: 'build/pages/productSell/productSell.html'
})

export class ProductSellPage {
 
  products: any = [
    { id: "1", namePro: "คาปูชิโน่", price: 89 },
    { id: "2", namePro: "เอสเปสโช่", price: 89 },
    { id: "3", namePro: "มอคค่า", price: 89 },
    { id: "4", namePro: "อาเมริกาโน่", price: 89 },
    { id: "5", namePro: "ลาเต้", price: 89 },
    { id: "6", namePro: "ชาเขียว", price: 59 },
    { id: "7", namePro: "ชาสมุนไพร", price: 59 },
    { id: "8", namePro: "น้ำส้ม", price: 59 },
    { id: "9", namePro: "ช็อคโกแลตร้อน", price: 89 },
    { id: "10", namePro: "น้ำมะเขือเทศ", price: 59 },
    { id: "11", namePro: "น้ำแร่", price: 15},
    { id: "12", namePro: "ชาผลไม้", price: 59 },
    { id: "13", namePro: "กีวี่ บลิซ", price: 89 },
    { id: "14", namePro: "น้ำส้ม 100%", price: 59 },
    { id: "15", namePro: "บลูเบอรี่ สทริป", price: 89 },
    { id: "16", namePro: "สตรอเบอร์รี่ บริ้งค์", price: 85 },
{ id: "17", namePro: "แมงโก้ แทงโก้", price: 85 },
{ id: "18", namePro: "วิปครีม", price: 15 },
{ id: "19", namePro: "น้ำเชื่อมกลิ่นต่างๆ", price: 15 },
{ id: "20", namePro: "เค้กกล้วยหอมช็อคโกแล็ต", price: 69 },
{ id: "21", namePro: "คัสตาร์ดเค้ก", price: 49 },
{ id: "22", namePro: "เค้กนมสด", price: 49 },
{ id: "23", namePro: "มูสเค้กช็อคโกแล็ต", price: 69 },
{ id: "24", namePro: "เค้กใบเตย", price: 59 }
    
    
    

    // { id: "17", namePro: "เหล้าปั่น", price: 100 },
    // { id: "18", namePro: "แสงโสม", price: 100 },
    // { id: "19", namePro: "เบน285", price: 100 },
    // { id: "20", namePro: "สไมนอฟ", price: 100 },
    // { id: "21", namePro: "ฟลูมูน", price: 100 },
    // { id: "22", namePro: "บรีสเซอร", price: 100 },
    // { id: "23", namePro: "โฮลกาเด้น", price: 100 },
    // { id: "24", namePro: "บรีสเซอร", price: 100 },
    // { id: "25", namePro: "โฮลกาเด้น", price: 100 }
  ];
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
  constructor(public navCtrl: NavController) {
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
  }
  PaymentPage() {
    this.navCtrl.push(PaymentPage, { "basket": this.basket, "totalprice": this.totalprice });
  }
  TablePage() {
    this.navCtrl.push(TablePage);
  }
  arrayIndexOf(myArr, key) {
    let result = -1;
    myArr.forEach(function (idx) {
      if (idx.id == key.id) result++;
    });
    return result;
  }

  chooseProduct(item) {
    if (this.arrayIndexOf(this.basket, item) != -1) {
      let selected = this.basket.filter(function (itm) {
        return itm.id == item.id;
      })[0];

      selected.piece++;
      this.totalprice += selected.totalPrice;
      this.total = selected.toTal;
    } else {
      item.piece = 1;
      item.totalPrice = item.price * item.piece;
      this.totalprice += item.totalPrice;
      this.basket.push(item);
    }

  }
  slideProduct() {

  }
}
