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
  //  tables:any = [
  //     {id_table: "#01", name_tabel: "01",id_cus : "0111" ,time_cus : "00:57", total:500 ,name_user: "Ananya",img_user : "image/alice.jpg"},
  //     {id_table: "#02", name_tabel: "02",id_cus : "0112" ,time_cus : "01:57", total:1500 ,name_user: "Barramee" ,img_user : "image/andrew.jpg"},
  //     {id_table: "#03", name_tabel: "03",id_cus : "0113" ,time_cus : "00:27", total:2500 ,name_user: "Sirintra" ,img_user : "image/carl.jpg"},
  //     {id_table: "#04", name_tabel: "04",id_cus : "0114" ,time_cus : "00:50", total:3500 ,name_user: "Apassara" ,img_user : "image/garry.jpg"},
  //     {id_table: "#05", name_tabel: "05",id_cus : "0115" ,time_cus : "02:07", total:2500 ,name_user: "Pornpan" ,img_user : "image/james.jpg"},
  //     {id_table: "#06", name_tabel: "06",id_cus : "0116" ,time_cus : "01:01", total:500 ,name_user: "Meechai" ,img_user : "image/jane.jpg"},
  //     {id_table: "#07", name_tabel: "07",id_cus : "0117" ,time_cus : "00:09", total:2500 ,name_user: "Attapon" ,img_user : "image/joyce.jpg"},
  //     {id_table: "#08", name_tabel: "08",id_cus : "0118" ,time_cus : "00:08", total:7500 ,name_user: "Deelan" ,img_user : "image/vincent.jpg"}
  //   ]
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
        
        this.http.get('https://cyber-pos.herokuapp.com/orders/bytable/' + element.name_table).map(res => {

          return res.json();


        }).subscribe(data => {

          console.log('Data object in subscribe method:');
          console.dir(data);
          if (data) {
            element.order = data;
          } 

        });
        console.log(element);
        this.fillterTable.push(element);
      });

      console.log(this.fillterTable);
    });
  }

  ProductSellPage(_item) {
    if(!_item.order)
    {
       _item.order = {
              user_name : 'eleme',
              name_table: _item.name_table,
              list_order: []
            };
    }
    this.navCtrl.push(ProductSellPage, { 'item': _item });
    console.log(_item);
  }
}
