import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpProvider} from '../../providers/http-provider';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-invoice-details',
  templateUrl: 'invoice-details.html',
  providers:[HttpProvider]
})
export class InvoiceDetails {
  details:any;
  id:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpProvider: HttpProvider, public storage: Storage) {
  this.id = navParams.get('param_id');
    this.storage.get('token').then(token=>{
      this.invoiceDetails(token);
    });
  }

  invoiceDetails(token){
  this.httpProvider.getData(token, 'invoices/'+this.id).subscribe(
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
