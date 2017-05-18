import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class LoaderCrtl {
    loader:any
    constructor(private loadingCtrl: LoadingController) {
        this.loader = this.loadingCtrl.create({
            content: "Obteniendo desde el Servidor",
        });
    }

    startLoader(){
        this.loader.present()
    }
    
    stopLoader(){
        this.loader.dismiss()
    }

}
