import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the RegisterPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage { items:any = [
    {id_user: "#CS01" , user_name: "Ananya" , position:"Cashier" , img: "image/alice.jpg"},
    {id_user: "#CS02" , user_name: "Sirintra" , position:"Cashier",img: "image/andrew.jpg"},
    {id_user: "#CS03" , user_name: "Orapan" , position:"Cashier",img: "image/carl.jpg"},
    {id_user: "#CS04" , user_name: "Nipaporn" , position:"Cashier",img: "image/carl.jpg"},
    {id_user: "#CS05" , user_name: "Nucha" , position:"Cashier",img: "image/carl.jpg"},
    {id_user: "#CS06" , user_name: "Satida" , position:"Cashier",img: "image/carl.jpg"},
    {id_user: "#MN01" , user_name: "Aemika" , position:"Manager",img: "image/carl.jpg"},
  ]
  constructor(private navCtrl: NavController) {

  }
  addNewPersonal(newPersonalName){
    let newPersonalObject = {name : newPersonalName};
    this.items.push(newPersonalObject);
  }
  onPop(){
    this.navCtrl.pop();
  }
  

}
