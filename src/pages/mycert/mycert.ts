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
    this.getView();
  }

  ccheckc(){
    this.storage.get('isClaimed').then((isClaimed) => {
      this.isClaimed = isClaimed;
    });//close storage
  }
  cancel(){
    this.navCtrl.setRoot(StartPage);
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
}
