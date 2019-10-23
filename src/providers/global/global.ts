import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class GlobalProvider {

  public mysite : string  = "http://18.136.211.207:4400/"; 
  //public mysite : string  = "http://192.168.43.194/cashweb/app/"; 
  //public mysite : string  = "http://localhost/uniszabc/api/";
  //public mysite : string  = "https://cashless1234.000webhostapp.com/api/";

  constructor(public http: HttpClient) {
    console.log('Hello GlobalProvider Provider');
  }

}