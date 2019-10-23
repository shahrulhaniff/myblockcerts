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
import { TextAvatarDirective } from '../directives/text-avatar/text-avatar';
//import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { Toast } from '@ionic-native/toast/ngx';
import { GlobalProvider } from '../providers/global/global';
import { SearchPipe } from '../pipes/search/search';
import { SortPipe } from '../pipes/sort/sort';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ProfilePage } from '../pages/profile/profile';
import { EditprofilePage } from '../pages/editprofile/editprofile';
import { ChangepassPage } from '../pages/changepass/changepass';
import { IonTextAvatar } from 'ionic-text-avatar';

import { ParallaxHeader } from '../directives/parallax-header/parallax-header';
import { HubungiPage } from '../pages/hubungi/hubungi';
import { MycertPage } from '../pages/mycert/mycert';
import { PenafianPage } from '../pages/penafian/penafian';
import { StartPage } from '../pages/start/start';
import { PrivatekeyPage } from '../pages/privatekey/privatekey';

import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import {  FileTransfer,  FileTransferObject  } from '@ionic-native/file-transfer';
import { Clipboard } from '@ionic-native/clipboard';
import { PfdmodalPage } from '../pages/pfdmodal/pfdmodal';
//import { PdfViewerPage } from '../pages/pdf-viewer/pdf-viewer';
//import { PdfViewerModule } from 'ng2-pdf-viewer';
//import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { DocumentViewer } from '@ionic-native/document-viewer';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    TextAvatarDirective,
    SearchPipe,
    SortPipe,
    ProfilePage,
    EditprofilePage,
    ChangepassPage,
    IonTextAvatar,
    HubungiPage,
    StartPage,
    MycertPage,
    PenafianPage,
    PrivatekeyPage,
    //PdfViewerPage,
    PfdmodalPage,
    ParallaxHeader
    
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot(),
    NgxQRCodeModule
    //,DocumentViewer
    //,PdfJsViewerModule
    //,PdfViewerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    ProfilePage,
    EditprofilePage,
    ChangepassPage,
    HubungiPage,
    StartPage,
    MycertPage,
    PenafianPage,
    PrivatekeyPage,
    PfdmodalPage
    
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
    FileOpener,
    FileTransfer,  
    FileTransferObject,
    Clipboard
    ,DocumentViewer
    

  ]
})
export class AppModule {}
