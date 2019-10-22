import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { GlobalProvider } from "../../providers/global/global";
import { Md5 } from 'ts-md5';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  createSuccess = false;
  public form     : FormGroup;
  
  private baseURI : string  = this.global.mysite;

  constructor(  public navCtrl    : NavController, 
                public navParams  : NavParams, 
                public global     : GlobalProvider,
                public http       : HttpClient,
                private alertCtrl : AlertController,
                public fb         : FormBuilder) {
                  /* Buat validation */
                  this.form = fb.group({
                    "username"    : ["", Validators.required],
                    "nama"        : ["", Validators.required],
                    "matr"        : ["", Validators.required],
                    "email"       : ["", Validators.required],
                    "phone"       : ["", Validators.required],
                    "password"    : ["", Validators.required],
                    "password2"   : ["", Validators.required],
                    "akap"        : ["", Validators.required]
                 });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    
    //this.register();
  }

  public usr;
  public pwd;
  
  register() : void
   {
      console.log('Masuk fungsi register'); 
      let usr     : string    = this.form.controls["username"].value,
          nama    : string    = this.form.controls["nama"].value,
          matr    : string    = this.form.controls["matr"].value,
          email   : string    = this.form.controls["email"].value,
          phone   : string    = this.form.controls["phone"].value,
          pwd     : string    = this.form.controls["password"].value,
          pwd2    : string    = this.form.controls["password2"].value,
          akap    : string    = this.form.controls["akap"].value;
      if (pwd!=pwd2) { this.showPopup("Perhatian", "Sila sahkan kata laluan anda."); }
      else { this.createUser(usr,nama,matr,email,phone, pwd, akap);  } 
      
    console.log('usr-->', usr , 'pwd-->', pwd); //undefine bosku
   }

   createUser(usr : string, nama : string, matr : string, email : string, phone : string, pwd : string, akap : string) : void
   { /* Md5.hashStr(pwd) */
      let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options 	: any		= {"usr" : usr, "nama" : nama, "matr" : matr, "email" : email, "phone" : phone, "pwd" : pwd, "akap" : akap },
          url       : any   = this.baseURI + "createUser.php";

      this.http.post(url, JSON.stringify(options), headers)
      .subscribe((record : any) =>
      {
         // If the request was successful notify the user
        this.createSuccess = true;
        this.showPopup("Tahniah", "Akaun telah didaftar.");
      },
      error => {
        this.showPopup("Pendaftaran Gagal", "Akaun telah wujud, sila hubungi admin");
      });
   }

   //Untuk Popup
   showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.navCtrl.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }
}