import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController, NavParams } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "./../../../node_modules/rxjs/Observable";
import { Storage } from '@ionic/storage';
import { EditprofilePage } from '../editprofile/editprofile';
import { ChangepassPage } from '../changepass/changepass';
import { ListPage } from '../list/list';
import { StartPage } from '../start/start';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {


  public fn : any ;
  public ln : any ;
  public token : any ;
  public usr : any ;
  
  public items : Array<any> = [];
  public profiles : Array<any> = [];
  private baseURI : string  = this.global.mysite; 
 

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http     : HttpClient,
              public global: GlobalProvider,
              public menuCtrl: MenuController,
              public storage  : Storage) {
         this.menuCtrl.enable(true, 'myMenu');
  }

  ionViewWillEnter() {
    this.load2();
    //this.load();
    //this.getRussel();
    console.log('ionViewDidLoad ProfilePage');
  }

  load2() : void
  { 
    this.storage.get('firstnamez').then((firstnamez) => { this.fn = firstnamez; }); 
    this.storage.get('lastnamez').then((lastnamez) => { this.ln = lastnamez; });
    this.storage.get('tokenz').then((tokenz) => { this.token = tokenz; });
    this.storage.get('user').then((usr) => { this.usr = usr; });
  }
  
  Certificate_Claim() : void
  {
      this.storage.get('tokenz').then((tokenz) => {
      let url       : any = this.baseURI+'api/v1/contract/claim/certificate',
      body 	    : any	= {'token': tokenz},
      headers 	: any	= new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }),
      data      : Observable<any> = this.http.get(url);
      this.http.put(url, body, headers)
      .subscribe((data : any) =>
      {
        console.log(data);
      },
      error => {
        console.log("Error!");
        console.log(error);
      }); 
   }); //close storage
  }
 /* load() : void
  {
    this.storage.get('kod_pengguna').then((kod_pengguna) => { 
    this.kodpengguna = kod_pengguna; console.log("session kod pengguna dekat profile",kod_pengguna);
    }); //close storage

     this.storage.get('user').then((user) => {

     let    url : any = this.baseURI+'retrieve_profile.php?id='+user+'&kodpengguna='+this.kodpengguna;
            
     this.http.get(url).subscribe((data : any) =>
     {
        console.dir(data);
        this.profiles = data;
        
        
     },
     (error : any) =>
     {
        console.dir(error);
     });
     //--------------------------------------------------
   }); //close storage
  } */

  editProfile(params : any){
    this.navCtrl.push(EditprofilePage, params);
  }

  changePass(params : any){
    this.navCtrl.push(ChangepassPage, params);
  }
  certinfo(params : any){
    this.navCtrl.push(StartPage, params);
  }
  
  scan(): void {
    this.navCtrl.push('ScanPage');
 }
 logout(): void {
    this.navCtrl.push(ListPage);
 }

 /*
const endpoint = 'http://localhost:3000/api/v1/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
}; */

 hantar = "Recipient";
 getRussel() {
  let url       = '../assets/jsonfile/ICert.postman_collection.json',
      data      : Observable<any> = this.http.get(url),
      headers 	: any	= new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }),
      options 	: any	= { "name" : this.hantar};

  this.http.post(url, JSON.stringify(options), headers)
      .subscribe((record : any) => 
      {
        console.log(record);
      },
      error => {
        console.log("Error!");
        console.log(error);
      });
}
}