import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import {HttpProvider} from '../../providers/http-provider';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the Ventas page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-ventas',
  templateUrl: 'ventas.html',
  providers:[HttpProvider]
})
export class Ventas {
  
  listventas:any;
  
  constructor(public navCtrl: NavController, private httpProvider:HttpProvider, public storage: Storage) {
    this.storage.get('token').then(token=>{
          this.listSales(token);  
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Ventas');
  }

  listSales(token){
    console.log("token ventas:" + token)
  this.httpProvider.getData(token, 'sales').subscribe(
    result => {
      this.listventas=result;
      console.log("Success : "+this.listventas);
    },
    err =>{
      console.error("Error : "+err);
    } ,
    () => {
      console.log('getData completed');
    }
  );
  }
}
