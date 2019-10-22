import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {  FileTransfer,  FileTransferObject  } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file/ngx';
import { Clipboard } from '@ionic-native/clipboard';


@IonicPage()
@Component({
  selector: 'page-privatekey',
  templateUrl: 'privatekey.html',
})
export class PrivatekeyPage {
  
  //here creating object to access file transfer object.  
  private fileTransfer: FileTransferObject; 
  public isEdited     : boolean = false;
  public myprivatekey     : any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private storage: Storage,
              private transfer: FileTransfer, 
              private file: File,
              public clipboard: Clipboard
              ) {}

  public download(fileName, filePath) {  
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
  } 

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrivatekeyPage');
    //this.download("sample.pdf","https://abcd.sharepoint.com/samplesite/Shared Documents/sample.pdf");
    
  }

  getPrivateKey(){
    this.storage.get('privateKey').then((privateKey) => {
    this.myprivatekey = privateKey;
  });//close storage
  this.isEdited      = true;
  }
  copy2(){
    this.storage.get('privateKey').then((privateKey) => {
      this.myprivatekey = privateKey;
      this.clipboard.copy(this.myprivatekey);
  });//close storage */
  }

  copy(){
    this.clipboard.copy('Hello world').then(rs => {
      console.log("CLIPBOARD",rs);
    }).catch(error => {
      console.log("CLIPBOARD",error);
    })
  }

}
