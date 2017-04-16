import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {HttpProvider} from '../../providers/http-provider';
import { Storage } from '@ionic/storage';
import { LoaderCrtl } from "../../providers/loader";

import { Ventas } from '../ventas/ventas';
import { Services } from '../services/services';
import { Cash } from '../cash/cash';
import { Invoices } from '../invoices/invoices';
import { Login } from "../login/login";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[HttpProvider, LoaderCrtl]
})
export class HomePage {
  ventas = Ventas;
  services = Services;
  cash = Cash;
  invoices = Invoices;
  
  sales_count: any;
  services_count: any;
  cash_total: any;

  constructor(public navCtrl: NavController, private httpProvider:HttpProvider, public loadingCtl: LoaderCrtl, public storage: Storage, public alertCtrl: AlertController) {
    this.storage.get('token').then(token=>{
          this.getCount(token);  
    })
  }

  showAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: [        
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.push(Login)
          }
        }]
    });
    alert.present();
  }

  getCount(token){
    this.loadingCtl.startLoader();
    this.httpProvider.getData(token, '').subscribe(
    result => {
      this.sales_count=result.sales;
      this.services_count=result.services;
      this.cash_total = result.cash
      console.log("Success : ");
    },
    err =>{
      this.showAlert("Error", "No se pudo conectar con el servidor, por favor vuelva a intentarlo")
      this.loadingCtl.stopLoader()
    } ,
    () => {
      console.log('getData completed');
      this.loadingCtl.stopLoader()
    });
  }
}
