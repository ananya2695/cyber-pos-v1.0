import { Component } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import { PaymentPage } from '../payment/payment';

@Component({
  templateUrl: 'build/pages/productSell/productSell.html'
})

export class ProductSellPage {
   items:any = [
    {namePro:"คาปูชิโน่",piece:1,price:100},
    {namePro:"เอสเปสโช่",piece:1,price:100},
    {namePro:"มอคค่า",piece:3,price:100},
    {namePro:"อาเมริกาโน่",piece:1,price:100},
    {namePro:"ลาเต้",piece:1,price:100},
    {namePro:"ชาเขียว",piece:2,price:100},
    {namePro:"ชานม",piece:1,price:100},
    {namePro:"นำ้ส้ม",piece:1,price:100},
    {namePro:"โอเลี้ยง",piece:4,price:100},
    {namePro:"โซดาไฟ",piece:1,price:100},
    {namePro:"เหล้าปั่น",piece:6,price:100}
    
  ]
  mySlideOptions = {
    pager: true
  };
   mySlideVertical = {
    direction : 'vertical'
  };
  constructor(public navCtrl: NavController) {
  
  }
  PaymentPage() {
    this.navCtrl.push(PaymentPage);
  }
}
