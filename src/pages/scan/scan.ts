import { Component } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';
//import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { MycertPage } from '../mycert/mycert';
import { ProfilePage } from '../profile/profile';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
})
export class ScanPage {

  scannedCode = null;
  private user: any;

  constructor(private barcodeScanner: BarcodeScanner, 
              public navCtrl: NavController, 
              private storage: Storage,
              private inAppBrowser : InAppBrowser,
              platform :Platform) {

                this.storage.get('user').then((user) => {
                  if(user==null) { 
                    let backAction = platform.registerBackButtonAction(() => {console.log("second");this.navCtrl.pop;this.navCtrl.setRoot(LoginPage);backAction();},2);
                  }
                  else {
                    let backAction = platform.registerBackButtonAction(() => {console.log("second");this.navCtrl.pop;this.navCtrl.setRoot(ProfilePage);backAction();},2);
                  }
                });//close storage
    
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScanPage');
  }

  ionViewWillEnter(){this.scanCode();};

  //public list : Array<any> = [];
  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
      if(this.scannedCode  != ""){
        //this.list.push({record: {id: barcodeData.text}});
        //this.list.push({record: {id: 'SB'}});
        //this.navCtrl.push(SenaraiPage, this.list[0]);

      /* SEMAK DOMAIN KALAU BERKAIT QR BLOKCERT
      if(this.scannedCode.substring(0,2) =="JT") {
        this.navCtrl.push(MycertPage, {
          data: this.scannedCode
        });
      }
      else {
        this.navCtrl.push(MycertPage, {
          data2: this.scannedCode
        });
      } */
      let uri = this.scannedCode;
      this.openWebpage(uri);
      //this.list=[];
      }else{

        this.storage.get('user').then((user) => {
          if(user==null) { this.navCtrl.pop;this.navCtrl.setRoot(LoginPage);}
          else {this.navCtrl.pop;this.navCtrl.setRoot(ProfilePage);}
        });//close storage
    }
    }, (err) => {
        console.log('Error: ', err);
    });
  }


  openWebpage(url:string){
    const options: InAppBrowserOptions = {zoom: 'yes'}
    const browser = this.inAppBrowser.create(url, '_self', options);
    //browser.close(); TAK JADI NI TRY BUAT KALAU JUMPA URL_DONE & SET MASA TIMEOUT PUN TAJADI
    if(url == "http://localhost/cashless2/app/done.php"){setTimeout(function () {browser.close();}, 1000);}
    //this.navCtrl.setRoot(MigsPage);
    this.navCtrl.setRoot(MycertPage, {
      //record: this.id_kodtransaksi
    });

  }


}