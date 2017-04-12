import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {HttpProvider} from '../../providers/http-provider';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { HomePage } from '../home/home'
import { Ventas } from '../ventas/ventas'

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers:[HttpProvider]
})
export class Login {
  private myForm: any;
  private myData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private builder: FormBuilder, public httpProvider:HttpProvider, public toastCtrl: ToastController) {
        this.myForm = builder.group({
      'token': '',
    })

    //If any session stored then log in automatically
    this.storage.ready().then(() => {
      this.storage.get('token').then(token=>{
        this.TestToken(token);
        this.toastMsg("Cargando Sesión")
      });
    });;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  gotoVentas(){
    this.navCtrl.push(Ventas)
  }

  toastMsg(msg){
          let toast = this.toastCtrl.create({
        message: msg,
        duration: 3000
      });
      toast.present();
  }


  onSubmit(formData) {
    this.myData = formData;
    this.storage.set('token', formData.token);
    this.TestToken(formData.token)
  }

  //Test if token are valid
  TestToken(token){
    console.log("token ventas:" + token)
  this.httpProvider.getData(token, 'sales').subscribe(
    result => {
      //If is valid then go to Home page
      console.log("Success");
      this.storage.ready().then(() => {
        this.navCtrl.push(HomePage);
      });
    },
    err =>{
      //else return a notification
      console.error("Error : "+err);
      this.toastMsg("La clave no es válida.")
    } ,
    () => {
      console.log('getData completed');
    }
  );
  }
}
