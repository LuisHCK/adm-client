import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import {Storage} from '@ionic/storage';

var SERVER_URL = "http://localhost:3000";

@Injectable()
export class HttpProvider {
  constructor(public http: Http, private storage:Storage) {
    console.log('Hello HttpProvider Provider');
    }
  
  getJsonData(){
    return this.http.get('https://www.reddit.com/r/worldnews/.json').map(res => res.json());

  }

  TestTOken(token){
    let opt: RequestOptions
    let headers: Headers = new Headers;
    
    opt = new RequestOptions({
     headers: headers
    })

    headers.append('Authorization', 'Token token='+token);
    headers.append('Content-Type', 'application/json');

    return this.http.get(SERVER_URL+'/sales', opt).timeout(10000).map(res => res.json());
  }

  getData(token, location){
    let opt: RequestOptions
    let headers: Headers = new Headers;
    
    opt = new RequestOptions({
     headers: headers
    })

    headers.append('Authorization', 'Token token='+token);
    headers.append('Content-Type', 'application/json');

    return this.http.get(SERVER_URL+'/'+location, opt).map(res => res.json());
  }
}
