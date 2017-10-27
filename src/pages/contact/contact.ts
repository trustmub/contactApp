import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { Storage } from '@ionic/storage';
import { ContactsProvider } from '../../providers/contacts/contacts';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  contactsfound = [];
  storedToken:string;

  fullname:string;
  phoneNumber:string;
  email:string;

  constructor(
    public navCtrl: NavController,
    private contactsProvider:ContactsProvider,
    private storage:Storage,
    private alertCtrl:AlertController) {
      let contact:Contacts = new Contacts();
      contact.find(["displayName", "phoneNumbers","emails"], {multiple: true}).then((contacts) => {
        this.contactsfound = contacts;
       },(err)=>{

       });
  }

  ionViewDidLoad(){
    this.storage.get('token').then((val) => {
      this.storedToken = val;
    });
  }

  addContact(){
    let fullname = this.fullname;
    let phoneNumber = this.phoneNumber;
    let email = this.email;

    this.contactsProvider.addContact(this.storedToken, fullname, phoneNumber, email).subscribe(res => {
      console.log(res.status);
      if(res.status == 201){
        let alert = this.alertCtrl.create({
          title: 'Success',
          subTitle: 'Contact Saved on the Cloud',
          buttons:['OK']
        });
        alert.present();
        this.navCtrl.push(HomePage);
      }
    });
  }
}
