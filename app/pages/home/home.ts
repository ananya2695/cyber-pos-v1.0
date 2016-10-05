import { Component } from '@angular/core';
import { NavController , ModalController  ,ViewController} from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { TablePage } from '../table/table';
import { SettingPage } from '../setting/setting.ts';

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
    {id_user: "#CS04" , user_name: "Nipaporn" , position:"Cashier",img: "image/garry.jpg"},
    {id_user: "#CS05" , user_name: "Nucha" , position:"Cashier",img: "image/james.jpg"},
    {id_user: "#CS06" , user_name: "Satida" , position:"Cashier",img: "image/joyce.jpg"},
    {id_user: "#MN01" , user_name: "Theerasak" , position:"Manager",img: "image/vincent.jpg"},
  ]
  constructor(private navCtrl: NavController, public modalCtrl: ModalController , public viewController: ViewController) {

  }



  addNewPersonal(newPersonalName){
    let newPersonalObject = {name : newPersonalName};
    this.items.push(newPersonalObject);
  }
  onPop(){
    this.navCtrl.pop();
  }
  tablePage(){
    this.navCtrl.push(TablePage);
  }
  registerPage(){
       let modal = this.modalCtrl.create(RegisterPage1);
       modal.onDidDismiss(data => {
     this.items.push(data);
   });
    modal.present();
  }
  openSetting(){
    this.navCtrl.push(SettingPage);
  }
}


@Component({
  templateUrl: 'build/pages/home/register-modal.html',
})
export class RegisterPage1 {

  constructor(private navCtrl: NavController, public modalCtrl: ModalController , public viewController: ViewController) {

  }
  regisSuccess(user_name,id_user,position){
    this.viewController.dismiss({"user_name":user_name, "id_user":id_user,"position":position,"img":"image/alice.jpg" });
  }
 

}