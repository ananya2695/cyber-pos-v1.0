import { Component } from '@angular/core';
import { NavController, ModalController, ViewController, NavParams} from 'ionic-angular';
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
export class HomePage {
    items: any = [
      { id_user: "#CS01", user_name: "Ananya",firstname : "Ananya",lastname:"Thogthai",password:"123456",repassword:"123456" ,position: "Cashier", img: "image/alice.jpg" },
      { id_user: "#CS02", user_name: "Sirintra", firstname : "Sirintra",lastname:"Thogthai",password:"123456",repassword:"123456" ,position: "Cashier", img: "image/andrew.jpg" },
      { id_user: "#CS03", user_name: "Orapan", firstname : "Orapan",lastname:"Thogthai",password:"123456",repassword:"123456" ,position: "Cashier", img: "image/carl.jpg" },
      { id_user: "#CS04", user_name: "Nipaporn",firstname : "Nipaporn",lastname:"Thogthai",password:"123456",repassword:"123456" , position: "Cashier", img: "image/garry.jpg" },
      { id_user: "#CS05", user_name: "Nucha", firstname : "Nucha",lastname:"Thogthai",password:"123456",repassword:"123456" ,position: "Cashier", img: "image/james.jpg" },
      { id_user: "#CS06", user_name: "Satida", firstname : "Satida",lastname:"Thogthai",password:"123456",repassword:"123456" ,position: "Cashier", img: "image/joyce.jpg" },
      { id_user: "#MN01", user_name: "Theerasak", firstname : "Theerasak",lastname:"Thogthai",password:"123456",repassword:"123456" ,position: "Manager", img: "image/vincent.jpg" },
    ]
  constructor(private navCtrl: NavController, public modalCtrl: ModalController,
    public viewController: ViewController) {

  }



  addNewPersonal(newPersonalName) {
    let newPersonalObject = { name: newPersonalName };
    this.items.push(newPersonalObject);
  }
  onPop() {
    this.navCtrl.pop();
  }
  tablePage() {
    this.navCtrl.push(TablePage);
  }
  registerPage() {
    let modal = this.modalCtrl.create(RegisterPage1);
    modal.onDidDismiss(data => {
      this.items.push(data);
    });
    modal.present();
  }
  openSetting() {
    let modal = this.modalCtrl.create(SettingUser, { 'items': this.items });

    modal.present();
  }
}


@Component({
  templateUrl: 'build/pages/home/register-modal.html',
})
export class RegisterPage1 {

  constructor(private navCtrl: NavController, public modalCtrl: ModalController, public viewController: ViewController) {

  }
  regisSuccess(user_name, id_user, position,firstname,lastname,password,repassword) {
    this.viewController.dismiss({ "user_name": user_name, "id_user": id_user, "firstname":firstname,"lastname":lastname,"password":password,"repassword":repassword,"position": position, "img": "image/alice.jpg" });
  }


}

@Component({
  templateUrl: 'build/pages/home/edit-modal.html',
})
export class EditUser {
  id_user:any;
  user_name:any;
  firstname:any;
  lastname:any;
  password:any;
  repassword:any;
  position:any;
  img:any;
  constructor(public navParams: NavParams, private navCtrl: NavController, public modalCtrl: ModalController, public viewController: ViewController) {
    let user = navParams.get('user');
    this.id_user = user.id_user;
    this.user_name = user.user_name;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.password = user.password;
    this.repassword = user.repassword;
    this.position = user.position;
    this.img = user.img;
  }
  editSuccess(user_name, id_user, position,firstname,lastname,password,repassword) {
    this.viewController.dismiss({  "user_name": user_name, "id_user": id_user, "firstname":firstname,"lastname":lastname,"password":password,"repassword":repassword,"position": position, "img": "image/alice.jpg" });
  }


}

@Component({
  templateUrl: 'build/pages/home/setting-modal.html',
})
export class SettingUser {
  items: any;
  constructor(public navParams: NavParams, private navCtrl: NavController, public modalCtrl: ModalController, public viewController: ViewController) {
    this.items = navParams.get('items');
  }
  editUser(item) {
    let modal = this.modalCtrl.create(EditUser,{'user':item});
    modal.onDidDismiss(data => {
      for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].id_user == data.id_user) {
          this.items[i] = data;
        break;
      }
    }
    });
    modal.present();
  }
  delUser(item) {
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].id_user == item.id_user) {
        this.items.splice(i, 1);
        break;
      }
    }
  }

}