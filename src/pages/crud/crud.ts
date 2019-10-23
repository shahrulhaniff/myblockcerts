import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from "../../providers/global/global";

@IonicPage()
@Component({
  selector: 'page-crud',
  templateUrl: 'crud.html'
})
export class CrudPage {

   public form               : FormGroup;
   public animeTitle         : any;
   public animeDescription   : any;
   public animeGenre         : any;
   public isEdited               : boolean = false;
   public hideForm               : boolean = false;
   public pageTitle              : string;
   public recordID               : any      = null;
   private baseURI : string  = this.global.mysite;




   // Initialise module classes
   constructor(public navCtrl    : NavController,
               public global     : GlobalProvider,
               public http       : HttpClient,
               public NP         : NavParams,
               public fb         : FormBuilder,
               public toastCtrl  : ToastController,
               public storage  : Storage )
   {
      // Create form builder validation rules
      this.form = fb.group({
         "title"     : ["", Validators.required],
         "desc"      : ["", Validators.required],
         "genre"     : ["", Validators.required]
      });
   }

   ionViewWillEnter() : void
   {
      this.resetFields();

      if(this.NP.get("record"))
      {
         this.isEdited      = true;
         this.selectEntry(this.NP.get("record"));
         this.pageTitle     = 'Amend entry';
      }
      else
      {
         this.isEdited      = false;
         this.pageTitle     = 'Create entry';
      }
   }

   selectEntry(item : any) : void
   {
      this.animeTitle        = item.title;
      this.animeDescription  = item.description;
      this.animeGenre        = item.genre;
      this.recordID          = item.id;
   }

   createEntry(title : string, desc : string, genre : string) : void
   {
      this.storage.get('user').then((user) => { //buka storage
      let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options 	: any		= { "key" : "create", "title" : title, "desc" : desc, "genre" : genre, "user" : user },
          url        : any   	= this.baseURI + "manage-data.php";

      this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data : any) =>
      {
         // If the request was successful notify the user
         this.hideForm = true;
         this.sendNotification(`Congratulations the anime: ${title} was successfully added`);
      },
      (error : any) =>
      {
         this.sendNotification('Something went wrong!');
      });

      console.log("simpan storage "+user); }); //tutup storage
   }


   updateEntry(title : string, desc : string, genre : string) : void
   {
      this.storage.get('user').then((user) => { //buka storage
      let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options 	: any		= { "user" : user,"key" : "update", "title" : title, "desc" : desc, "genre" : genre, "recordID" : this.recordID},
          url       : any      	= this.baseURI + "manage-data.php";

      this.http
      .post(url, JSON.stringify(options), headers)
      .subscribe(data =>
      {
         // If the request was successful notify the user
         this.hideForm  =  true;
         this.sendNotification(`Congratulations the anime: ${title} was successfully updated`);
      },
      (error : any) =>
      {
         this.sendNotification('Something went wrong!');
      });
   });//tutup storage
   }




   /**
    * Remove an existing record that has been selected in the page's HTML form
    * Use angular's http post method to submit the record data
    * to our remote PHP script
    *
    * @public
    * @method deleteEntry
    * @return {None}
    */
   deleteEntry(title : string) : void
   {
      this.storage.get('user').then((user) => { //buka storage
      //recordID      	= this.recordID;
      title         = this.form.controls["title"].value;
      let
          headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options 	: any		= { "key" : "delete", "recordID" : this.recordID, "user" : user},
          url        : any    = this.baseURI + "manage-data.php";

      this.http
      .post(url, JSON.stringify(options), headers)
      .subscribe(data =>
      {
         this.hideForm = true;
         this.sendNotification(`Congratulations the anime: ${title} was successfully deleted`);
      },
      (error : any) =>
      {
        console.dir(error);
         this.sendNotification('Something went wrong!');
      });
   }); //tutup storage
   }





   /**
    * Handle data submitted from the page's HTML form
    * Determine whether we are adding a new record or amending an
    * existing record
    *
    * @public
    * @method saveEntry
    * @return {None}
    */
   saveEntry() : void
   {
      let title          : string = this.form.controls["title"].value,
          desc           : string = this.form.controls["desc"].value,
          genre           : string = this.form.controls["genre"].value;

      if(this.isEdited)
      {
         this.updateEntry(title, desc, genre);
      }
      else
      {
         this.createEntry(title, desc, genre);
      }
   }




   /**
    * Clear values in the page's HTML form fields
    *
    * @public
    * @method resetFields
    * @return {None}
    */
   resetFields() : void
   {
      this.animeTitle           = "";
      this.animeDescription    = "";
      this.animeGenre          = "";
   }




   /**
    * Manage notifying the user of the outcome of remote operations
    *
    * @public
    * @method sendNotification
    * @param message 	{String} 			Message to be displayed in the notification
    * @return {None}
    */
   sendNotification(message : string)  : void
   {
      let notification = this.toastCtrl.create({
          message       : message,
          duration      : 3000
      });
      notification.present();
   }
}
/* kalau something wrong, test php dgn data dummy */