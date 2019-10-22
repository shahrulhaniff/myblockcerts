import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
//import { Md5 } from 'ts-md5';
import  jsSHA  from 'jssha';


@IonicPage()
@Component({
  selector: 'page-changepass',
  templateUrl: 'changepass.html',
})
export class ChangepassPage {

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

  }

  user = "";
  kodpengguna = "";
  name = "";
  email = "";
  telnum = "";
  ic ="";
  createSuccess = false;
  cpass = "";
  currentpass = "";
  newpass = "";
  ppass ="";

  public cpassarray : Array<any> = [];
  public icarray : Array<any> = [];
  public kodarray : Array<any> = [];


  selectEntry(profile : any) : void
    {
      this.name = profile.nama;
      this.email = profile.email;
      this.telnum=profile.no_telefon;
    }
    
    

    submit(){
      let shaObj = new jsSHA("SHA-256", "TEXT");
      shaObj.update(this.currentpass);
      let hash = shaObj.getHash("HEX");

      if(this.newpass=="" || this.currentpass=="" || this.ppass==""){
        this.showPopup("Gagal", "Sila isi semua maklumat.");
      } else {
      if(this.newpass == this.ppass){
        
        if(hash == this.cpass){
          this.changepass(this.newpass, this.user, this.kodpengguna);
        } else {
          this.showPopup("Gagal", "Kata laluan terkini salah.");
        }
      } else {
        this.showPopup("Gagal", "Pengesahan kata laluan anda tidak sama dengan kata laluan baru.");
      }
    }}

    changepass(pwd : any, user : string, kodpengguna : string) : void
   {
      let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options 	: any		= {"pwd" : pwd, "user" : user, "kodpengguna" : kodpengguna },
          url       : any   = this.baseURI + "changepass.php";

      this.http.post(url, JSON.stringify(options), headers)
      .subscribe((record : any) =>
      {
         // If the request was successful notify the user
         this.createSuccess = true;
        this.showPopup("Tahniah", "Kata laluan telah berjaya ditukar.");
      },
      error => {
        this.showPopup("Gagal", "Sila cuba lagi sekali.");
      });
   }

  load() : void
  {
    this.storage.get('kod_pengguna').then((kod_pengguna) => { 
      this.kodpengguna = kod_pengguna;
    }); //close storage

     this.storage.get('user').then((user) => {
      this.user = user;

      let    urlz : any = this.baseURI+'retrieve_pass.php?id='+user+'&kodpengguna='+this.kodpengguna;
            
     this.http.get(urlz).subscribe((data : any) =>
     {
        console.dir(data);
        this.profiles = data;

        this.user = user;

        this.cpassarray = this.profiles.map(profiles => profiles.pwd);
        this.icarray = this.profiles.map(profiles => profiles.ic_pengguna);
        this.kodarray = this.profiles.map(profiles => profiles.kod_pengguna);


        for(let i = 0; i < this.profiles.length; i++){
          if(user == this.icarray[i] && this.kodpengguna == this.kodarray[i]){
            this.cpass = this.cpassarray[i];
            break;
          }
      }
     },
     (error : any) =>
     {
        console.dir(error);
     });
     //--------------------------------------------------
   }); //close storage
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
            }
          }
        }
      ]
    });
    alert.present();
  }


}
