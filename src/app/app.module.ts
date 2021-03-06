import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Ventas } from '../pages/ventas/ventas';
import { Login } from '../pages/login/login';
import { Services } from '../pages/services/services';
import { SaleDetails } from '../pages/sale-details/sale-details';
import { Cash } from '../pages/cash/cash';
import { Invoices } from '../pages/invoices/invoices';
import { InvoiceDetails } from '../pages/invoice-details/invoice-details';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Ventas,
    Login,
    Services,
    SaleDetails,
    Cash,
    Invoices,
    InvoiceDetails,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Ventas,
    Login,
    Services,
    SaleDetails,
    Cash,
    Invoices,
    InvoiceDetails,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
