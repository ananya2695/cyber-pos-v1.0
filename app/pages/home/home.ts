import { Component } from '@angular/core';
import {Camera} from 'ionic-native';
import { NavController, ModalController, ViewController, NavParams} from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { TablePage } from '../table/table';
import { SettingPage } from '../setting/setting.ts';
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
    // items: any = [
    //   { id_user: "#CS01", user_name: "Ananya",firstname : "Ananya",lastname:"Thogthai",password:"123456",repassword:"123456" ,position: "Cashier", img: "image/alice.jpg" },
    //   { id_user: "#CS02", user_name: "Sirintra", firstname : "Sirintra",lastname:"Thogthai",password:"123456",repassword:"123456" ,position: "Cashier", img: "image/andrew.jpg" },
    //   { id_user: "#CS03", user_name: "Orapan", firstname : "Orapan",lastname:"Thogthai",password:"123456",repassword:"123456" ,position: "Cashier", img: "image/carl.jpg" },
    //   { id_user: "#CS04", user_name: "Nipaporn",firstname : "Nipaporn",lastname:"Thogthai",password:"123456",repassword:"123456" , position: "Cashier", img: "image/garry.jpg" },
    //   { id_user: "#CS05", user_name: "Nucha", firstname : "Nucha",lastname:"Thogthai",password:"123456",repassword:"123456" ,position: "Cashier", img: "image/james.jpg" },
    //   { id_user: "#CS06", user_name: "Satida", firstname : "Satida",lastname:"Thogthai",password:"123456",repassword:"123456" ,position: "Cashier", img: "image/joyce.jpg" },
    //   { id_user: "#MN01", user_name: "Theerasak", firstname : "Theerasak",lastname:"Thogthai",password:"123456",repassword:"123456" ,position: "Manager", img: "image/vincent.jpg" },
    // ]
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



  addNewPersonal(newPersonalName) {
    let newPersonalObject = { name: newPersonalName };
    this.items.push(newPersonalObject);
  }
  onPop() {
    this.navCtrl.pop();
  }
  tablePage(item) {
    this.navCtrl.push(TablePage , { "user_name": item.user_name});
    console.log(item.user_name);
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
   public base64Image: string;
   returnMessage = "";
  constructor(private navCtrl: NavController, public modalCtrl: ModalController, 
  public viewController: ViewController,public http: Http) {

  }
   takePicture(){
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
  regisSuccess(user_name, user_id, position,user_firstname,user_lastname,password,confirmpassword) {
    //this.viewController.dismiss({ "user_name": user_name, "id_user": id_user, "firstname":firstname,"lastname":lastname,"password":password,"repassword":repassword,"position": position, "img": this.base64Image });
       let body = { 'user_name' : user_name , 'user_id' : user_id, 'position' : position,
                     'user_firstname':user_firstname,'user_lastname':user_lastname,
                      'password':password,'confirmpassword':confirmpassword,"img_user": this.base64Image };
      this.viewController.dismiss(body);
    console.dir(body);

    this.http.post('https://cyber-pos.herokuapp.com/users', body).map(res => {
      
      // console.log('Result in mapping method:');
      // console.dir(res);
      return res.json();

    }).subscribe(data => {
      
      // console.log('Data object in subscribe method:');
      console.dir(data);
      this.returnMessage = data.message;
      console.log(this.returnMessage);
    
    });
  }


}

@Component({
  templateUrl: 'build/pages/home/edit-modal.html',
})
export class EditUser {
  returnMsg ="";
  _id:any;
  user_id:any;
  user_name:any;
  user_firstname:any;
  user_lastname:any;
  password:any;
  confirmpassword:any;
  position:any;
  img_user:any;
  constructor(public navParams: NavParams, private navCtrl: NavController, 
  public modalCtrl: ModalController, public viewController: ViewController,public http: Http) {
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
  editSuccess(user_name, user_id, position,user_firstname,user_lastname,password,confirmpassword) {
       
        let body = {'_id':this._id ,'user_name' : user_name , 'user_id' : user_id, 'position' : position,
                     'user_firstname':user_firstname,'user_lastname':user_lastname,
                      'password':password,'confirmpassword':confirmpassword };
                      console.log(body);
      this.viewController.dismiss(body);
    console.dir(body)

    this.http.put('https://cyber-pos.herokuapp.com/users/' +  this._id, body).map(res => {
      
      // console.log('Result in mapping method:');
      // console.dir(res);
      return res.json();

    }).subscribe(data => {
      
      // console.log('Data object in subscribe method:');
      console.dir(data);
      this.returnMsg = data.message;
    
    });
}


}

@Component({
  templateUrl: 'build/pages/home/setting-modal.html',
})
export class SettingUser {
  returnMsg="";
  items: any;
  constructor(public navParams: NavParams, private navCtrl: NavController, public modalCtrl: ModalController,
   public viewController: ViewController,public http: Http) {
    this.items = navParams.get('items');
    console.log(this.items);
  }
  editUser(item) {
    let modal = this.modalCtrl.create(EditUser,{'user':item});
    modal.onDidDismiss(data => {
      console.log(data);
      for (var i = 0; i < this.items.length; i++) {
      if (this.items[i]._id == data._id) {
          this.items[i] = data;
        break;
      }
    }
    });
    modal.present();
  }
  delUser(item) {
    
    
    this.http.delete('https://cyber-pos.herokuapp.com/users/' +  item._id).map(res => {
      
      // console.log('Result in mapping method:');
      // console.dir(res);
      return res.json();

    }).subscribe(data => {
      
      // console.log('Data object in subscribe method:');
      console.dir(data);
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