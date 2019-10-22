import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { ProfilePage } from '../profile/profile';


@IonicPage()
@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditprofilePage {

  public profiles : Array<any> = [];
  private baseURI : string  = this.global.mysite; 

  constructor(private alertCtrl : AlertController,
              public navCtrl: NavController,
              public navParams: NavParams,
              public http     : HttpClient,
              public global: GlobalProvider,
              public storage  : Storage) {
  }


  ionViewWillEnter() : void {
    this.load(); 

    if(this.navParams.get("record"))
    {
      this.selectEntry(this.navParams.get("record"));
    }

    console.log('ionViewDidLoad ProfilePage');
  }

  user = "";
  kodpengguna = "";
  name = "";
  email = "";
  telnum = "";
  ic ="";
  akap ="";
  matr ="";
  createSuccess = false;


  selectEntry(profile : any) : void
    {
      this.name = profile.nama;
      this.email = profile.email;
      this.telnum=profile.no_telefon;
      this.akap=profile.jenis_akaun;
      this.matr=profile.matr;
    }

    submit(){
      this.update(this.name, this.email, this.telnum,this.matr, this.akap, this.user, this.kodpengguna);
    }

    update(name : string, email : string, telnum : string, matr : string, akap : string, user : string, kodpengguna : string) : void
   {
      this.storage.set('nama', name);
      let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options 	: any		= {"name" : name, "email" : email, "telnum" : telnum, "matr" : matr, "akap" : akap, "user" : user, "kodpengguna" : kodpengguna },
          url       : any   = this.baseURI + "editprofile.php"; 

      this.http.post(url, JSON.stringify(options), headers)
      .subscribe((record : any) =>
      {
         // If the request was successful notify the user
         this.createSuccess = true;
         this.showPopup("Success", "Profile updated.");
      },
      error => {
        this.showPopup("Wait", "Dummy Data.");
      });
   }

  load() : void
  {
    this.storage.get('kod_pengguna').then((kod_pengguna) => { this.kodpengguna = kod_pengguna;});
    this.storage.get('user').then((user) => {this.user = user;});
  }


  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              //this.navCtrl.popToRoot();
              this.navCtrl.setRoot(ProfilePage);
            }
          }
        }
      ]
    });
    alert.present();
  }


}
