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


  shareEntry( authorization : string, 
              emel          : string, 
              certificateId : string, 
              issuedBy      : string
  ) : void { //start
    let url       : any = this.baseURI+'api/v1/contract/certificate/share';
    let body 	    : any	= {'emails[]': emel, 'certificateId': certificateId, 'issuedBy': issuedBy};
    //[CARA ASAL]
    let headers = new HttpHeaders({
      'authorization': authorization,
      'Content-Type': 'application/x-www-form-urlencoded' });

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
} //end

}
