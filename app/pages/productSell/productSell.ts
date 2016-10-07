import { Component } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import { PaymentPage } from '../payment/payment';
import { TablePage } from'../table/table';

@Component({
  templateUrl: 'build/pages/productSell/productSell.html'
})

export class ProductSellPage {
   products:any = [
    {id:"1",namePro:"คาปูชิโน่",price:100},
    {id:"2",namePro:"เอสเปสโช่",price:100},
    {id:"3",namePro:"มอคค่า",price:100},
    {id:"4",namePro:"อาเมริกาโน่",price:100},
    {id:"5",namePro:"ลาเต้",price:100},
    {id:"6",namePro:"ชาเขียว",price:100},
    {id:"7",namePro:"ชานม",price:100},
    {id:"8",namePro:"น้ำส้ม",price:100},
    {id:"9",namePro:"โอเลี้ยง",price:100},
    {id:"10",namePro:"โซดาไฟ",price:100},
    {id:"11",namePro:"โซดา",price:100},
    {id:"12",namePro:"เหล้าปั่น",price:100}
    
  ];
  basket:any = [];
  totalprice:any = 0.00;
 
  mySlideOptions = {
    pager: true
  };
   mySlideVertical = {
    direction : 'vertical'
  };
  constructor(public navCtrl: NavController) {
  
  }
  PaymentPage() {
    this.navCtrl.push(PaymentPage,{"basket":this.basket, "totalprice":this.totalprice});
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

  chooseProduct(item){
    if (this.arrayIndexOf(this.basket, item) != -1) {
        let selected = this.basket.filter(function(itm){
          return itm.id == item.id;
        })[0];

        selected.piece++;
        selected.totalPrice = selected.price ;
        selected.price = selected.price * selected.piece;
        this.totalprice += selected.totalPrice;
      } else {
        item.piece = 1;
        item.totalPrice = item.price * item.piece;
        this.totalprice += item.totalPrice;
        this.basket.push(item);
      }

  }
}
