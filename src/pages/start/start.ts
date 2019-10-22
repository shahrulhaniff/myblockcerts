import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,MenuController} from 'ionic-angular';
import { MycertPage } from '../mycert/mycert';
import { GlobalProvider } from "../../providers/global/global";
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';
//import { Observable } from "./../../../node_modules/rxjs/Observable";


@IonicPage()
@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {
  
  public items    : Array<any> = [];
  public itemsPK    : Array<any> = [];
  private baseURI : string  = this.global.mysite; 

  constructor(public navCtrl  : NavController, 
              public http     : HttpClient,
              public navParams: NavParams,
              public global   : GlobalProvider,
              public menuCtrl: MenuController,
              public storage  : Storage) {
              this.menuCtrl.enable(true, 'myMenu');
  }

  public fn : any ;
  public ln : any ;
  public token : any ;
  public usr : any ;
  public certificationName : any ;
  public isClaimed : any ;
  public certificationDate : any ;

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartPage');
    this.load();
    this.c_listing();
  }

  load() : void
  { 
    this.storage.get('firstnamez').then((firstnamez) => { this.fn = firstnamez; });
    this.storage.get('lastnamez').then((lastnamez) => { this.ln = lastnamez; });
    this.storage.get('tokenz').then((tokenz) => { this.token = tokenz; });
    this.storage.get('user').then((usr) => { this.usr = usr; });
  }
  certInfo(params : any){
    this.navCtrl.push(MycertPage, params);
  }
  claim(params : any){
    this.navCtrl.push(MycertPage, params);
  }

  //AFIQ
  c_listing() {
    this.storage.get('tokenz').then((tokenz) => {
    this.token = tokenz;
    console.log("TOKEN", this.token);

    let url       : any = this.baseURI + 'api/v1/certificates';
    let urlPK       : any = this.baseURI + 'api/v1/users/priv/key';/*,
        headers 	: any	= new Headers({ 
          'Authorization': this.token , 
          'Content-Type': 'application/x-www-form-urlencoded'
        }),data   : Observable<any> = this.http.get(url); */

        let headers = new HttpHeaders({
          'Authorization': this.token , 
          'Content-Type': 'application/x-www-form-urlencoded'
        });
        let options = {
          headers: headers
        }

    console.log(headers)
    this.http.get(url, options)
        .subscribe((data : any) => 
        {
          //console.log("MAKLUMAT:",data);
          this.items = data;

           let res1 = data["data"];
           let res2 = res1["data"];
           let res3 = res2["0"];
           let res4 = res3["createdBy"];
           let res5 = res3["fileId"];
           //console.log("RES",res5[0]);
           
           let fileId        = res5[0];
           //let issueraddress = res3["accountID"];
           let privateKey    = res4["privateKey"];
           let ethAddress    = res4["ethAddress"];
           let cname         = res3["certificationName"];
           let _id           = res3["_id"]; 

           this.storage.set('certificateId', _id);
           this.storage.set('fileId'       , fileId);
           this.storage.set('issuerAddress', ethAddress);
           //this.storage.set('privateKeyISSUER'   , privateKey);

           console.log("DAPAT DOH [Authorization]a.k.a[TOKEN]"   ,tokenz);
           console.log("DAPAT certificationName"                 ,cname);
           console.log("DAPAT certificateId"                     ,_id);
           console.log("DAPAT fileId"                            ,fileId);
           console.log("DAPAT issuerAddress"                     ,ethAddress);
           //console.log("DAPAT privateKeyISSUER"                ,privateKey);

          this.certificationName = cname;
          this.isClaimed = res3["isClaimed"]; 
          console.log("DAPAT boolean isClaimed: ",this.isClaimed);
          this.storage.set('isClaimed' , this.isClaimed);
          this.certificationDate = res3["status"]; console.log(this.certificationDate);
        },
        error => {
          console.log("Error certificationName!");
          console.log(error);
        });

        //GET PRIVATE KEY USING SAME TOKEN AT options (url,options)
        this.http.get(urlPK, options)
        .subscribe((data : any) => 
        {
          //console.log("MAKLUMAT:",data);
          this.itemsPK = data;
           let PK = data["data"];
           //console.log("DAPAT PK RECIPIENT",PK);
           let privateKey    = PK;
           this.storage.set('privateKey' , privateKey);
           console.log("DAPAT privateKey",privateKey);
        },
        error => {
          console.log("Error certificationName!");
          console.log(error);
        });//CLOSE for GET PRIVATE KEY
      });//close storage
  }

}