import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http-provider';
import { LoaderCrtl } from "../../providers/loader";
import { Storage } from '@ionic/storage';

import { SaleDetails } from '../sale-details/sale-details';
import { HomePage } from "../home/home";

/**
 * Generated class for the Ventas page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-ventas',
  templateUrl: 'ventas.html',
  providers: [HttpProvider, LoaderCrtl]
})
export class Ventas {

  listventas: any;
  token: any;

  constructor(public navCtrl: NavController, private httpProvider: HttpProvider, public storage: Storage, public loaderCrtl: LoaderCrtl, public alertCtrl: AlertController) {
    this.storage.get('token').then(token => {
      this.listSales(token);
    })
  }

  saleDetails(id) {
    this.navCtrl.push(SaleDetails, {
      param_id: id
    });
  }

  showAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: [        
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.push(HomePage)
          }
        }]
    });
    alert.present();
  }

  doRefresh(refresher) {
    this.httpProvider.getData(this.token, 'sales').subscribe(
      result => {
        this.listventas = result;
        if (refresher != 0) {
          refresher.complete();
        }
      });
  };

  listSales(token) {
    this.loaderCrtl.startLoader()
    this.httpProvider.getData(token, 'sales').subscribe(
      result => {
        this.listventas = result;
        console.log("Success : " + this.listventas);
      },
      err => {
        this.showAlert("Error","No se pudo cargar la lista de ventas")
        this.loaderCrtl.stopLoader();
      },
      () => {
        this.loaderCrtl.stopLoader();
      }
    );
    this.token = token;
  }
}
