import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class LocalStorage{
    constructor(private storage:Storage) {
        storage.ready().then(() => {
            console.log('Initialize Local Storage');
        });
    }

    //store the Token
    setToken(token){
        this.storage.ready().then(() => {
            this.storage.set('token',token).then(token=>{
                console.log('TOKEN SAVED: '+ token);
            });
        });
    }

        //get the stored token
    getToken(){
        let stored_token
    	this.storage.get('token').then(token=>{
    		stored_token = token
    	});
        return stored_token;
    }

    //delete the token
    removeToken(){
    this.storage.remove('token').then(()=>{
    		console.log('token is removed');
    	});
    }

    //clear the whole local storage
    clearStorage(){
    	this.storage.clear().then(()=>{
		console.log('all keys are cleared');
    	});
    }

}
