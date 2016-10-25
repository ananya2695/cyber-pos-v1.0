import { Component } from '@angular/core';
import {Camera} from 'ionic-native';
import { NavController, ModalController, ViewController, NavParams} from 'ionic-angular';
import { TablePage } from '../table/table';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the RegisterPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  items = [];
  constructor(private navCtrl: NavController, public modalCtrl: ModalController,
    public viewController: ViewController, public http: Http) {
    this.http.get('https://cyber-pos.herokuapp.com/users').map(res => {

      return res.json();

    }).subscribe(data => {

      console.log('Data object in subscribe method:');
      console.dir(data);
      this.items = data;

    });
  }

  onPop() {
    this.navCtrl.pop();
  }
  tablePage(item) {
    this.navCtrl.push(TablePage, { "user_name": item.user_name });
    console.log(item.user_name);
  }
  registerPage() {
    let modal = this.modalCtrl.create(RegisterPage1);
    modal.onDidDismiss(data => {
      if (data) {
        this.items.push(data);
      }
    });
    modal.present();
    console.log(this.items);
  }

  openSetting() {
    this.http.get('https://cyber-pos.herokuapp.com/users').map(res => {

      return res.json();

    }).subscribe(data => {

      console.log('Data object in subscribe method:');
      console.dir(data);
      this.items = data;
      console.log(this.items);
      let modal = this.modalCtrl.create(SettingUser, { 'items': this.items });

      modal.present();
      console.log(this.items);
    });
  }
}

@Component({
  templateUrl: 'build/pages/home/register-modal.html',
})
export class RegisterPage1 {
  public base64Image: string;
  returnMessage = "";
  item: any[];
  constructor(private navCtrl: NavController, public modalCtrl: ModalController,
    public viewController: ViewController, public http: Http) {
  }
  takePicture() {
    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.base64Image = "data:image/jpeg;base64," + imageData;
      console.log(this.base64Image);
    }, (err) => {
      console.log(err);
    });
  }
  regisSuccess(user_name, user_id, position, user_firstname, user_lastname, password, confirmpassword) {
    let body = {
      'user_name': user_name, 'user_id': user_id, 'position': position,
      'user_firstname': user_firstname, 'user_lastname': user_lastname,
      'password': password, 'confirmpassword': confirmpassword, "img_user": "image/default.png"
    };
    this.viewController.dismiss(body);
    console.dir(body);

    this.http.post('https://cyber-pos.herokuapp.com/users', body).map(res => {
      return res.json();

    }).subscribe(data => {
      console.dir(data);
      console.log(data._id);
      this.item = data;
    });
  }
}

@Component({
  templateUrl: 'build/pages/home/edit-modal.html',
})
export class EditUser {
  returnMsg = "";
  _id: any;
  user_id: any;
  user_name: any;
  user_firstname: any;
  user_lastname: any;
  password: any;
  confirmpassword: any;
  position: any;
  img_user: any;
  constructor(public navParams: NavParams, private navCtrl: NavController,
    public modalCtrl: ModalController, public viewController: ViewController, public http: Http) {
    let user = navParams.get('user');
    this._id = user._id;
    console.log(this._id);
    this.user_id = user.user_id;
    console.log(this.user_id);
    this.user_name = user.user_name;
    this.user_firstname = user.user_firstname;
    this.user_lastname = user.user_lastname;
    this.password = user.password;
    this.confirmpassword = user.confirmpassword;
    console.log(this.confirmpassword);
    this.position = user.position;
    this.img_user = user.img_user;
  }
  editSuccess(user_name, user_id, position, user_firstname, user_lastname, password, confirmpassword) {

    let body = {
      '_id': this._id, 'user_name': user_name, 'user_id': user_id, 'position': position,
      'user_firstname': user_firstname, 'user_lastname': user_lastname,
      'password': password, 'confirmpassword': confirmpassword, "img_user": "image/default.png"
    };
    console.log(body);
    this.viewController.dismiss(body);
    console.dir(body)

    this.http.put('https://cyber-pos.herokuapp.com/users/' + this._id, body).map(res => {

      return res.json();

    }).subscribe(data => {

      this.returnMsg = data.message;

    });
  }
}

@Component({
  templateUrl: 'build/pages/home/setting-modal.html',
})
export class SettingUser {
  returnMsg = "";
  items: any;
  constructor(public navParams: NavParams, private navCtrl: NavController, public modalCtrl: ModalController,
    public viewController: ViewController, public http: Http) {
    this.items = navParams.get('items');
    console.log(this.items);
  }
  editUser(item) {
    let modal = this.modalCtrl.create(EditUser, { 'user': item });
    modal.onDidDismiss(data => {
      console.log(data);

      if (data) {
        for (var i = 0; i < this.items.length; i++) {
          if (this.items[i]._id == data._id) {
            this.items[i] = data;
            break;
          }
        }
      }
    });
    modal.present();
  }
  delUser(item) {


    this.http.delete('https://cyber-pos.herokuapp.com/users/' + item._id).map(res => {

      return res.json();

    }).subscribe(data => {

      this.returnMsg = data.message;

    });
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i]._id == item._id) {
        this.items.splice(i, 1);
        break;
      }
    }
  }
}