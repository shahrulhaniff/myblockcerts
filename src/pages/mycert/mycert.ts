import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,LoadingController,Loading } from 'ionic-angular';
import { StartPage } from '../start/start';
import { Storage } from '@ionic/storage';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { GlobalProvider } from "../../providers/global/global";
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from "./../../../node_modules/rxjs/Observable";
import { Modal, ModalController } from 'ionic-angular';
import { PfdmodalPage } from '../pfdmodal/pfdmodal';
import { PrivatekeyPage } from '../privatekey/privatekey';
//import { PdfViewerPage } from '../pdf-viewer/pdf-viewer';



@IonicPage()
@Component({
  selector: 'page-mycert',
  templateUrl: 'mycert.html',
})
export class MycertPage {

  public isClaimed : boolean;
  public form     : FormGroup;
  private baseURI : string  = this.global.mysite;
  public items    : Array<any> = [];
  public cid    : any;
  public fid    : any;
  public pk_value    : any;
  public buttonClaim: boolean = false;
  public buttonPaste: boolean = false;
  public token : any ;

  loading: Loading;
  createSuccess = false;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public global: GlobalProvider,
              public http     : HttpClient,
              private alertCtrl : AlertController,
              public storage  : Storage,
              public fb         : FormBuilder,
              private loadingCtrl: LoadingController,
              private modalCtrl: ModalController) {

    /* Buat validation */
    this.form = fb.group({
      "pk"    : ["", Validators.required]
   });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MycertPage');
    this.ccheckc();
    this.loadparams();
    //this.getView();
    console.log("RISHAM",this.buttonClaim);
    console.log("RISHAM2",this.buttonPaste);
  }

  ccheckc(){
    this.storage.get('isClaimed').then((isClaimed) => {
      this.isClaimed = isClaimed;
      if(isClaimed==true){this.getView();}
    });//close storage
  }
  cancel(){
    this.navCtrl.setRoot(StartPage);
  }
  gotopk(){
    this.navCtrl.setRoot(PrivatekeyPage);
  }
  paste(){
    this.buttonPaste = false;
    this.buttonClaim = true;
    this.pk_value = this.navParams.get("record");
    //this.navCtrl.setRoot(StartPage);
  }

  loadparams(){
    if (this.navParams.get("record")) {
      //this.selectEntry(this.navParams.get("record"));
      this.buttonPaste = true;
      console.log('Data dari navparam min: ', this.navParams.get("record"));
    }
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

  popup(){
    this.showLoading();
    this.showPopup("Congratulations", "Certificate Claimed");
    this.loading.dismiss();
  }

  //public pdfSrc : any = "http://18.136.211.207:4400/api/v1/view/certificate?certificateId=5dada31e1ee2f866423900ff&fileId=5dada3271ee2f8664239011a";
  //public pdfSrc : any = "../../assets/documents/cert.pdf";
  pdfSrc = "https://drive.google.com/open?id=1eB5QBlK32ANUbzNrWyAu1SXqnxk0ORIw";
  getView(){
    let modal: Modal = this.modalCtrl.create(PfdmodalPage, {
      displayData:{
        pdfSource: {
          url : '../../assets/documents/cert.pdf', withCredentials: true
        }
      }
    });
    modal.present();
    console.log(modal);
    } 


    //ENDGAME_API
    ENDGAME_API(){
      let url       : any = this.baseURI+'api/v1/users/login',
          body 	    : any	= {'email': "contoh@gmail.com", 'password': "password123"},
          headers 	: any	= new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }),
          data      : Observable<any> = this.http.get(url);
      this.http.post(url, body, headers)
          .subscribe((data : any) => 
          {
            console.log(data);
            this.items = data;   // get data in result variable
            console.log("ENDGAME2", this.items["data"].firstName);
          },
          error => {
            console.log("Error!");
            console.log(error);
            this.showPopup("Got an error",error);
          }); 
        }
    //ENDGAME_API

    //SUBMIT FORM TO CLAIM
    saveEntry() : void
   {
      this.storage.get('tokenz').then((tokenz) => { //buka storage
        this.token = tokenz;
        console.log("TOKEN DLM MYCERTPAGE", this.token);
        let url       : any = this.baseURI + 'api/v1/certificates';
    
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
              console.log("MAKLUMAT MYCERTPAGE:",data);
              this.items = data;
              let res1 = data["data"];
              let res2 = res1["data"];
              let res3 = res2["0"];
              let res4 = res3["createdBy"];
              let res5 = res3["fileId"];
              //console.log("RES",res5[0]);
           
           let fileId        = res5[0];
           //let issueraddress = res3["accountID"];
           //let privateKey    = res4["privateKey"];
           let issuerAddress    = res4["ethAddress"];
           let cname         = res3["certificationName"];
           let _id           = res3["_id"]; 
           let authorization = tokenz;
           console.log("cDAPAT DOH [Authorization]a.k.a[TOKEN]"   ,authorization,"==",tokenz);
           console.log("cDAPAT certificationName"                 ,cname);
           console.log("cDAPAT certificateId"                     ,_id);
           console.log("cDAPAT fileId"                            ,fileId);
           console.log("cDAPAT issuerAddress"                     ,issuerAddress);

              let privateKey   : string = this.form.controls["pk"].value;
              //xyz : string = this.xydfffffffffffffffffffz;
              this.createEntry(authorization,fileId,issuerAddress,privateKey);
            },
        error => {
          console.log("Error certificationName!");
          console.log(error);
        });
      }); /* tutup storage kod_pengguna*/ 
   }
   
   createEntry( authorization : string, 
                fileId        : string, 
                issuerAddress : string,
                privateKey    : string
              ) : void { //start
                let url       : any = this.baseURI+'api/v1/contract/claim/certificate',
                body 	    : any	= {'fileId': fileId, 'issuerAddress': issuerAddress, 'privateKey': privateKey},
                headers 	: any	= new HttpHeaders({ 'authorization': authorization ,'Content-Type': 'application/x-www-form-urlencoded' }),
                data      : Observable<any> = this.http.get(url);
            this.http.put(url, body, headers)
                .subscribe((data : any) => 
                {
                  console.log(data);
                  this.items = data;
                  this.showLoading();
                  this.showPopup("Success","Certificate Claimed");
                  this.loading.dismiss();
                  this.navCtrl.setRoot(StartPage);
                },
                error => {
                  console.log("Error!");
                  console.log(error);
                  this.showLoading();
                  this.showPopup("Error 401","Unauthorized access");
                  this.loading.dismiss();
                }); 
   } //end
    //SUBMIT END


}
