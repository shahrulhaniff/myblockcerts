import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,LoadingController,Loading } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { GlobalProvider } from "../../providers/global/global";
import { HttpClient,HttpHeaders, HttpParams  } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { StartPage } from '../start/start';


@IonicPage()
@Component({
  selector: 'page-sharecert',
  templateUrl: 'sharecert.html',
})
export class SharecertPage {

  public form     : FormGroup;
  public emel     : any;
  public token : any ;
  private baseURI : string  = this.global.mysite;
  public items    : Array<any> = [];
  public certificationName : any ;
  public isClaimed : any ;
  public certificationDate : any ;
  public itemsPK    : Array<any> = [];
  loading: Loading;
  createSuccess = false;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public fb         : FormBuilder,
              public global: GlobalProvider,
              public http     : HttpClient,
              private alertCtrl : AlertController,
              public storage  : Storage,
              private loadingCtrl: LoadingController
              ) {
    /* Buat validation */
    this.form = fb.group({
      "emel"    : ["", Validators.required]
   });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SharecertPage');
  }
  //showloading
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  //Untuk Popup
  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.navCtrl.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }


  shareEntry() : void { //start sharing

    //open session
    this.storage.get('user').then((usr) => {
    this.storage.get('pwd').then((pwd) => {

    //get token with userbane and pass - to refresh need to relogin ROTI TEST DUMMY
    //let usr     : string    = "recipient1@yopmail.com";
    //let pwd     : string    = "Test@123";
    let url2     : any = this.baseURI+'api/v1/users/login';
    let body2 	  : any	= {'email': usr, 'password': pwd};
    this.http.post(url2, body2).subscribe((data : any) => {// open userpass refresh login
    //console.log(data);
    this.items = data;
    let authorization : any = this.items["data"].token;
    
    //get maklumat based n token refresh
    let urlcert       : any = this.baseURI + 'api/v1/certificates';
    let headerscert = new HttpHeaders({'Authorization': authorization , 'Content-Type': 'application/x-www-form-urlencoded'});
    let options2 = { headers: headerscert }
    this.http.get(urlcert, options2).subscribe((data : any) => {
    //console.log("MAKLUMAT:",data);
    //this.items = data;
    let res1 = data["data"];
    let res2 = res1["data"];
    let res3 = res2["0"];
    let res4 = res3["createdBy"];
    let res5 = res3["fileId"];
    let res6 = res3["issuedBy"];
    
    let issuedBy    = res6["_id"];
    let certificateId :any = res3["_id"];
  


    /*###################################################################################################*/
    /*###################################################################################################*/
    /*###################################################################################################*/
    /*###################################################################################################*/
    //post to share certifcate mula di sini
    let emel    : any = this.form.controls["emel"].value;
    let emails : Array<any> = [emel];
    let url    : any = this.baseURI+'api/v1/contract/certificate/share';
    let body   : any	= {'emails': emails, 'certificateId': certificateId, 'issuedBy': issuedBy};
    let headers = new HttpHeaders({'authorization': authorization,'Content-Type':'application/json'});
    //let options = {headers: headers}

    this.http.post(url, body, {headers})/*options @ headers*/
    .subscribe((response : any) => 
    {
      console.log(response);
      this.showLoading();
      this.showPopup(response["message"],"Certificate shared to the email");
      this.loading.dismiss();
      this.navCtrl.setRoot(StartPage);
    },
    error => {
      console.log("Error!");
      this.showLoading();
      //ERR_FRM_API
      console.log(error);
      console.log(error["message"]);
      console.log(error["statusText"]);
      let error_title = error["status"]+" "+error["statusText"];
      let error_string = "<br><b>status:</b>"+ error["status"]
                        +"<br><br><b>statusText:</b> " + error["statusText"] 
                        +"<br><br><b>message:</b> " + error["message"] 
                        +"<br><br><b>name:</b> " + error["name"]
                        +"<br><br><b>ok:</b> " + error["ok"]
                        +"<br><br><b>url:</b> " + error["url"]
                        ;
      this.showPopup(error_title,error_string);
      this.loading.dismiss();
      });
      /*###################################################################################################*/
      /*###################################################################################################*/
      /*###################################################################################################*/
      /*###################################################################################################*/



    //tutup get maklumat
    },error => { console.log("Error urlcert!"); });
    //tutup userpass refresh login
    },error => { let error_string = "status: "+ error["error"].status + " message: " + error["error"].message + " data: " + error["error"].data; this.showPopup("Login Refresh token error",error_string);});

  });});//close session

  } //end

}
