import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import {HttpProvider} from '../../providers/http-provider';
import { Ventas } from '../ventas/ventas';
import { Services } from '../services/services';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[HttpProvider]
})
export class HomePage {
  ventas = Ventas;
  services = Services;
  
  sales_count: any;
  services_count: any;
  cash_total: any;

  constructor(public navCtrl: NavController, private httpProvider:HttpProvider, public loadingCtl: LoadingController, public storage: Storage) {
    this.storage.get('token').then(token=>{
          this.getCount(token);  
    })
  }

  getCount(token){
    console.log("token ventas:" + token)
    this.httpProvider.getData(token, '').subscribe(
    result => {
      this.sales_count=result.sales;
      this.services_count=result.services;
      this.cash_total = result.cash
      console.log("Success : ");
    },
    err =>{
      console.error("Error : "+err);
    } ,
    () => {
      console.log('getData completed');
    });
  }
}
