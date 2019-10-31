import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';
import { StartPage } from '../start/start';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';
import { DomSanitizer} from '@angular/platform-browser';
import { GlobalProvider } from "../../providers/global/global";
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-pfdmodal',
  templateUrl: 'pfdmodal.html',
})
export class PfdmodalPage {
  pdfLink:any;
  displayData: any = {};
  private baseURI : string  = this.global.mysite;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public global: GlobalProvider,
              public appCtrl: App,
              public storage  : Storage
              ,private document: DocumentViewer
              ,private sanitizer: DomSanitizer
              ) {
                this.storage.get('certificateId').then((certificateId) => {
                  this.storage.get('fileId').then((fileId) => {
                    console.log('fileId', fileId)
                    this.pdfLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.baseURI+'api/v1/view/certificate?certificateId='+certificateId+'&fileId='+fileId);
                  });
                });
              }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PfdmodalPage');
    this.displayData = this.navParams.get('displayData');
    
    const options: DocumentViewerOptions = {
      title: 'My PDF'
    }
    this.document.viewDocument('../../assets/documents/cert.pdf', 'application/pdf', options);
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

}
