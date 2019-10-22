import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public storage : Storage) {

  }

  public logout() {
    //this.auth.logout().subscribe(succ => {
      this.storage.clear();

      this.storage.get('user').then((user) => { console.log("clear storage "+user); });

      this.navCtrl.setRoot(LoginPage)
    //});
  }

  
  login(): void {
    this.navCtrl.setRoot(LoginPage);
 }
 scan(): void {
    this.navCtrl.push('ScanPage');
 }
 
}
