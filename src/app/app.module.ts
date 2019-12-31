import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
//import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { Toast } from '@ionic-native/toast/ngx';
import { GlobalProvider } from '../providers/global/global';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ProfilePage } from '../pages/profile/profile';

import { MycertPage } from '../pages/mycert/mycert';
import { HubungiPage } from '../pages/hubungi/hubungi';
import { PenafianPage } from '../pages/penafian/penafian';
import { StartPage } from '../pages/start/start';
import { PrivatekeyPage } from '../pages/privatekey/privatekey';
import { PfdmodalPage } from '../pages/pfdmodal/pfdmodal';

import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { SharecertPage } from '../pages/sharecert/sharecert';
//import {  FileTransfer,  FileTransferObject  } from '@ionic-native/file-transfer';
//import { Clipboard } from '@ionic-native/clipboard';
//import { PdfViewerPage } from '../pages/pdf-viewer/pdf-viewer';
//import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
//import { PdfViewerModule } from 'ng2-pdf-viewer';
//import { SimplePdfViewerModule } from 'simple-pdf-viewer';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    ProfilePage,
    HubungiPage,
    StartPage,
    MycertPage,
    PenafianPage,
    PrivatekeyPage,
    //PdfViewerPage,
    PfdmodalPage,
    SharecertPage
    //,ParallaxHeader


  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot(),
    NgxQRCodeModule
    //,PdfJsViewerModule
    //,PdfViewerModule //SEPATUTNYA SINI
    //,SimplePdfViewerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    ProfilePage,
    StartPage,
    MycertPage,
    PenafianPage,
    PrivatekeyPage,
    PfdmodalPage,
    HubungiPage,
    SharecertPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BarcodeScanner,
    Toast,
    GlobalProvider,
    InAppBrowser,
    File,
    FileOpener
    //,FileTransfer
    //,FileTransferObject
    //,Clipboard
    ,DocumentViewer


  ]
})
export class AppModule {}
