import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Device } from '@ionic-native/device';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  model:any;
  platform:string;
  version:any;
  serial:any;
  devideId:any;
  manufacturer:any;


  constructor(public navCtrl: NavController) {
    let device:Device = new Device();
    this.model = device.model;
    this.platform = device.platform;
    this.serial = device.serial;
    this.devideId = device.uuid;
    this.manufacturer = device.manufacturer;
       
  }

  ionViewDidLoad(){

  }

}
