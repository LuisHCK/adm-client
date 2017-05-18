import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpProvider} from '../../providers/http-provider';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-services',
  templateUrl: 'services.html',
  providers:[HttpProvider]
})
export class Services {

  Listervices:any;
  token:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpProvider:HttpProvider, public storage: Storage) {
    this.storage.get('token').then(token=>{
          this.listServices(token);  
    })
  }

  noItems(item) {
    if (item){
      return false
    }
    else{
      return true
    }
  }

  doRefresh(refresher) {
    this.httpProvider.getData(this.token, 'services').subscribe(
      result => {
        this.Listervices = result;
        if (refresher != 0) {
          refresher.complete();
        }
      }
    );
  };

  listServices(token){
    console.log("token ventas:" + token)
    //Call the provider
    this.httpProvider.getData(token, 'services').subscribe(
    result => {
      this.Listervices=result;
      console.log("Success : "+this.Listervices);
    },
    err =>{
      console.error("Error : "+err);
    } ,
    () => {
      console.log('getData completed');
    });
    this.token = token;
  }
}
