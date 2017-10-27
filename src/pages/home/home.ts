import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ContactsProvider } from '../../providers/contacts/contacts';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  storedToken:string;
  itemlisting:any;

  fullname:string;
  phoneNumber:string;
  email:string;

  constructor(
    public navCtrl: NavController,
    private storage:Storage, 
    private contactsProvider: ContactsProvider) {
      
    // console.log(this.storage.get('token'));    
  }

  ionViewDidLoad(){
    this.storage.get('token').then((val)=>{
      this.storedToken = val;
      this.contactsProvider.getContacts(this.storedToken).subscribe(res =>{
        this.itemlisting = res.json();
        console.log(this.itemlisting);
      },(providerError) => {
        console.log(providerError);
      });
    },(storageError)=>{
      console.log(storageError);
    });    
  }
  refreshContactList(){
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }
  deleteItem(item){
    this.contactsProvider.deleteContact(this.storedToken, item.id).subscribe(res => {      
      if(res.status == 200){
        this.navCtrl.setRoot(this.navCtrl.getActive().component);
      }
    },(err) => {
      console.log(err)
    });
  }
 
}