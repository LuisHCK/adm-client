import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HttpProvider} from '../../providers/http-provider';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-sale-details',
  templateUrl: 'sale-details.html',
  providers:[HttpProvider]
})
export class SaleDetails{

  details:any
  id:any

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpProvider: HttpProvider, public storage: Storage) {
    this.id = navParams.get('param_id');
    this.storage.get('token').then(token=>{
      this.saleDetails(token);
    });
  }

  saleDetails(token){
  this.httpProvider.getData(token, 'sales/'+this.id).subscribe(
    result => {
      this.details=result;
      console.log("Success : ");
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
