import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { SignupProvider } from '../../providers/signup/signup';
import { WelcomePage } from '../welcome/welcome';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  username:string;
  password:string;
  confirmPassword:string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl:AlertController, 
    private signupProvider:SignupProvider) {
      this.username='';
      this.password='';
      this.confirmPassword='';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signup(){
    let username = this.username;
    let password = this.password;
    let confirmPassword = this.confirmPassword;
    if(password != confirmPassword){
      // create an alert the passwords dont match
      let alert = this.alertCtrl.create({
        title: 'Signup Error!',
        subTitle: 'The Passwords you entered do not match!',
        buttons: ['OK']
      });
      alert.present();
    } else{
      // call the accout creation provider
      console.log("The passwords matched");
      this.signupProvider.creatUser(username, password).subscribe(val => {
        console.log(val.status);
        if (val.status == 200){
          console.log(val.status);
          // give an alert the user already exists          
            let logAlert = this.alertCtrl.create({
              title: 'Signup Error!',
              subTitle: 'The Username is already taken try again!',
              buttons: ['OK']
            });
            logAlert.present();
        }else if(val.status == 201){
          console.log(val);
          console.log(val.status);
          console.log(val.json().username);
          let logAlert = this.alertCtrl.create({
            title: 'Successfuly Created!',
            subTitle: 'Successfuly created new account for '+ val.json().username +'!',
            buttons: ['OK']
          });
          logAlert.present();
          this.navCtrl.push(WelcomePage);
        }
      },(err) => {
        console.log(err);
      });
    }

  }

}
