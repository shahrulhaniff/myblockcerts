import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ListPage } from '../pages/list/list';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from "../providers/global/global";
import { ProfilePage } from '../pages/profile/profile';
import { HubungiPage } from '../pages/hubungi/hubungi';
import { PenafianPage } from '../pages/penafian/penafian';
import { StartPage } from '../pages/start/start';
import { LoginPage } from '../pages/login/login';
import { PrivatekeyPage } from '../pages/privatekey/privatekey';
import { MycertPage } from '../pages/mycert/mycert';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any ;
  private user: any;
  pages: any;
  namadata : any;

  constructor(public global: GlobalProvider,
              public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen,
              private storage: Storage,
              public events: Events) {

                events.subscribe('user:created', (user) => {
                  this.namadata=user;
                  console.log("GUNA EVENTS.SUBSCRIBE utk ubah value@app.component.ts:",user);
                });


    //this.initializeApp();
    //this.getNama();
    //One time Login Purposes
    this.storage.get('user').then((user) => {
      this.namadata=user;
      this.user = user; console.log("data kat dalam app.co-->"+this.user);
      if(this.user==null) { this.rootPage = MycertPage; }// Bhavana onana LoginPage
      else {this.rootPage=StartPage; }
    });//close storage


      this.pages = [
        { title: 'Certificates', component: StartPage , Icon :'ios-ribbon-outline'},
        { title: 'Blockchain Info', component: PrivatekeyPage , Icon :'key'},
        { title: 'Profile', component: ProfilePage , Icon :'person'},
        { title: 'Scan QR', component: 'ScanPage', Icon :'md-qr-scanner' },
        { title: 'Disclaimer', component: PenafianPage, Icon :'md-checkmark-circle-outline' },
        { title: 'Contact Us', component: HubungiPage, Icon :'call' }
        //{ title: 'Sign Out', component: ListPage, Icon :'log-out' }
      ];
    
}

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  logout(){
    this.nav.push(ListPage);
  }

}