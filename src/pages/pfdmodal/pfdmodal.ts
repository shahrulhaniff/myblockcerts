import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';
import { StartPage } from '../start/start';
import { DomSanitizer} from '@angular/platform-browser';
import { GlobalProvider } from "../../providers/global/global";
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';
//import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';
import * as PDFJS from "pdfjs-dist/webpack.js";
import { PDFPageProxy, PDFPageViewport, PDFRenderTask } from 'pdfjs-dist';

@IonicPage()
@Component({
  selector: 'page-pfdmodal',
  templateUrl: 'pfdmodal.html',
})
export class PfdmodalPage {
  pdfLink:any;
  displayData: any = {};
  private baseURI : string  = this.global.mysite;
  private mypdfplugin : string  = this.global.mypdfplugin;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public global: GlobalProvider,
              public appCtrl: App,
              public http     : HttpClient,
              public storage  : Storage
              //,private document: DocumentViewer
              ,private sanitizer: DomSanitizer
              ) { 
                //this.testDocumentViewerV3();
                this.storage.get('certificateId').then((certificateId) => {
                  this.storage.get('fileId').then((fileId) => {
                    console.log('fileId', fileId);
                    //this.pdfLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.baseURI+'api/v1/view/certificate?certificateId='+certificateId+'&fileId='+fileId);
                      this.pdfLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.mypdfplugin+'?certificateId='+certificateId+'&fileId='+fileId);
                    //this.pdfLink = this.sanitizer.bypassSecurityTrustResourceUrl('https://picserio.com/data/out/396/view-wallpaper_6015079.jpg');
                    //this.pdfLink = this.sanitizer.bypassSecurityTrustResourceUrl('http://damante.ml/six/six/web/viewer.php');
                    console.log(this.pdfLink);
                  });
                });
              }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PfdmodalPage');
    this.displayData = this.navParams.get('displayData');
    //this.document.viewDocument('../../assets/documents/cert.pdf', 'application/pdf', options);
  }
  onClose(): void {
    this.viewCtrl.dismiss();
  }
  myClose(){
    //this.navCtrl.push(StartPage);
    //this.navCtrl.setRoot(StartPage);
    this.viewCtrl.dismiss().then(() => {
    //this.navCtrl.setRoot(StartPage);
    this.appCtrl.getRootNav().setRoot(StartPage);
  });
  }

  /*
  hantarsesi(){
    this.storage.get('certificateId').then((certificateId) => {
      this.storage.get('fileId').then((fileId) => {
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options 	: any		= { "certificateId" : certificateId, "fileId" : fileId, "api" : this.baseURI},
          //url       : any   	= "http://damante.ml/six/six/web/getsesi.php"; 
          url       : any   	= this.mypdfplugin+'six/web/getsesi.php';
          console.log("API ICERT :",this.baseURI);
          console.log("API PDF   :",this.mypdfplugin+"six/web/getsesi.php");

      this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data : any) =>
      {
         // If the request was successful notify the user
         console.log("data ", data ); 
         console.log("data2 ", this.mypdfplugin+'six/web/viewer.php' ); 
         this.pdfLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.mypdfplugin+'six/web/viewer.php');
         console.log("this.pdfLink",this.pdfLink);
      },
      (error : any) =>
      {
         console.log("error ", error ); 
      });  
     });
    });
  } */

}
