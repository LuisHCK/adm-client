import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HttpProvider} from '../../providers/http-provider';
import { Storage } from '@ionic/storage';

import { InvoiceDetails } from "../invoice-details/invoice-details";

@Component({
  selector: 'page-invoices',
  templateUrl: 'invoices.html',
  providers:[HttpProvider]
})
export class Invoices {
  list:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpProvider:HttpProvider, public storage: Storage) {
    this.storage.get('token').then(token=>{
          this.listInvoices(token);  
    })
  }

  invoiceDetails(id){
    this.navCtrl.push(InvoiceDetails,{
      param_id: id
    });
  }

  listInvoices(token){
  this.httpProvider.getData(token, 'invoices').subscribe(
    result => {
      this.list=result;
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
