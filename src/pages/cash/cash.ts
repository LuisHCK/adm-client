import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpProvider } from '../../providers/http-provider';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-cash',
  templateUrl: 'cash.html',
  providers: [HttpProvider]
})
export class Cash {

  cash: any;
  day: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public httpProvider: HttpProvider) {
    this.storage.get('token').then(token => {
      this.cashDetails(token);
    });
  }

  cashDetails(token) {
    this.httpProvider.getData(token, 'cashes/').subscribe(
      result => {
        this.cash = result;
        this.day = this.getDayName()
      },
      err => {
        console.error("Error : " + err);
      },
      () => {
        console.log('getData completed');
      }
    );
  }

  getDayName() {
    var day = new Date(this.cash.date_open)
    var daynumber = day.getDay()
    var dayname

    switch (daynumber) {
      case 0: {
        dayname = "Domingo";
        break;
      }
      case 1: {
        dayname = "Lunes";
        break;
      }
      case 2: {
        dayname = "Martes"
        break;
      }
      case 3: {
        dayname = "Miércoles";
        break;
      }
      case 4: {
        dayname = "Jueves";
        break;
      }
      case 5: {
        dayname = "Viernes";
        break;
      }
      case 6: {
        dayname = "Sábado";
        break;
      }
      default: {
        dayname = "Bad Day"; 
        break;
      }
    }
    return dayname;
  }

}
