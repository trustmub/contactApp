import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { LoginProvider } from '../../providers/login/login';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginResponse:any;
  username:string;
  password:string;    
  
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl:AlertController,
    private loginProvider: LoginProvider,
    private storage: Storage) {

      this.username='';
      this.password='';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');   
  }

  login(){
    let logcred ={
    username: this.username,
    password: this.password
    }
    this.loginProvider.getToken(this.username, this.password).subscribe(token => {
      if(token.status == 200){
        this.loginResponse = token.json();
        this.storage.set('token', this.loginResponse.token);
        this.navCtrl.push(TabsPage);
      } else{
        // popup an allert box for wrong password and username
        console.log("Some unknow response received");        
      }
    },(err) =>{
      console.log(err.status);      
      let alert = this.alertCtrl.create({
        title: 'Login Error!',
        subTitle: 'The Username or/and Password you entered do not match!',
        buttons: ['OK']
      });
      alert.present();  
    });
  }

  
  
}
