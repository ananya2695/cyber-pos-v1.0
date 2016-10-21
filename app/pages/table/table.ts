import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductSellPage } from '../productSell/productSell.ts';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the TablePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/table/table.html',
})
export class TablePage {
  fillterTable: any = [];
  user_name: any;
  tables = [];
  paid:any = false;
  fillData: any = [];
  constructor(private navCtrl: NavController, public http: Http, public navParam: NavParams) {

    this.user_name = navParam.get("user_name");
    console.log(this.user_name);
    this.http.get('https://cyber-pos.herokuapp.com/tables').map(res => {

      return res.json();

    }).subscribe(data => {

      console.log('Data object in subscribe method:');
      console.dir(data);
      this.tables = data;
      console.log(this.tables);
      // for(let i =0;i< this.tables.length;i++){
      //   if(this.user_name == this.tables[i].user_name){
      //     this.fillterTable.push(this.tables[i]);
      //   }

      // }
      this.tables.forEach(element => {
        console.log(element);
        this.http.get('https://cyber-pos.herokuapp.com/orders/bytable/' + element.name_table).map(res => {

          return res.json();


        }).subscribe(data => {

          // console.log('Data object in subscribe method:');
          console.dir(data);
          if (data) {
            element.order = data;
          }

        });


         this.fillData = element;
        console.log(this.fillData.order);
          // if(this.fillData.order){
           this.fillterTable.push(this.fillData);
          // console.log(this.fillterTable);
          // }
        
       




      });

      //  this.fillterTable.push(this.fillData);
      console.log(this.fillterTable);
    });
  }

  ProductSellPage(_item) {

    //let totalprice= localStorage.getItem('totalprice');
    function createGuid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
    var uuid = createGuid();
    console.log(uuid);
    if (!_item.order) {
      _item.order = {
        user_name: this.user_name,
        name_table: _item.name_table,
        totalPrice: _item.totalPrice,
        id_cus: _item.id_cus,
        id_order: _item.id_order,
        time_cus: _item.time_cus,
        paid: this.paid,
        list_order: []
      };
    }
    this.navCtrl.push(ProductSellPage, { 'item': _item, 'uuid': uuid });
    console.log(_item);


  }
}
