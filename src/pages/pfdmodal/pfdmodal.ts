import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';
import { StartPage } from '../start/start';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';
import { DomSanitizer} from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-pfdmodal',
  templateUrl: 'pfdmodal.html',
})
export class PfdmodalPage {
  pdfLink:any;
  displayData: any = {};

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public appCtrl: App
              ,private document: DocumentViewer
              ,private sanitizer: DomSanitizer
              ) {
                this.pdfLink = this.sanitizer.bypassSecurityTrustResourceUrl('http://18.136.211.207:4400/api/v1/view/certificate?certificateId=5dada31e1ee2f866423900ff&fileId=5dada3271ee2f8664239011a');
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
