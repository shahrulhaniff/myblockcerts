import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';
import { StartPage } from '../start/start';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';

@IonicPage()
@Component({
  selector: 'page-pfdmodal',
  templateUrl: 'pfdmodal.html',
})
export class PfdmodalPage {

  displayData: any = {};

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public appCtrl: App
              ,private document: DocumentViewer
              ) {
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
