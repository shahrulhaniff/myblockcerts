import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
//import {  FileTransfer,  FileTransferObject  } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file/ngx';
import { MycertPage } from '../mycert/mycert';
//import { Clipboard } from '@ionic-native/clipboard';


@IonicPage()
@Component({
  selector: 'page-privatekey',
  templateUrl: 'privatekey.html',
})
export class PrivatekeyPage {
  
  //here creating object to access file transfer object.  
  //private fileTransfer: FileTransferObject; 
  public isEdited     : boolean = false;
  public myprivatekey     : any;
  public cname     : any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private storage: Storage
              //,private file: File
              //,private transfer: FileTransfer 
              //,public clipboard: Clipboard
              ) {}

  ionViewDidLoad() {
    this.loadcname();
    console.log('ionViewDidLoad PrivatekeyPage');
  }

  getPrivateKey(){
    this.storage.get('privateKey').then((privateKey) => {
    this.myprivatekey = privateKey;
  });//close storage
  this.isEdited      = true;
  }

  
  loadcname(){  
    this.storage.get('cname').then((cname) => {this.cname = cname;});//close storage 
  }
  copy(params : any){
      this.navCtrl.push(MycertPage, params);
      console.log('params to paste',params);
  }
  /*public download(fileName, filePath) {
    //here encoding path as encodeURI() format.  
    let url = encodeURI(filePath);  
    //here initializing object.  
    this.fileTransfer = this.transfer.create();  
    // here iam mentioned this line this.file.externalRootDirectory is a native pre-defined file path storage. You can change a file path whatever pre-defined method.  
    this.fileTransfer.download(url, this.file.externalRootDirectory + fileName, true).then((entry) => {  
        //here logging our success downloaded file path in mobile.  
        console.log('download completed: ' + entry.toURL());  
    }, (error) => {  
        //here logging our error its easier to find out what type of error occured.  
        console.log('download failed: ' + error);  
    });  
  } */
  /*
  copy2(){
    this.storage.get('privateKey').then((privateKey) => {
      this.myprivatekey = privateKey;
      this.clipboard.copy(this.myprivatekey);
  });//close storage 
  }

  copy(){
    this.clipboard.copy('Hello world').then(rs => {
      console.log("CLIPBOARD",rs);
    }).catch(error => {
      console.log("CLIPBOARD",error);
    }) 
  }*/
  
}
