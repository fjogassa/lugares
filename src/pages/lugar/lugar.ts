import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Lugar } from '../../models/lugar';

@Component({
  selector: 'page-lugar',
  templateUrl: 'lugar.html',
})
export class LugarPage {

  lugar: Lugar;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    console.log(navParams.data);
    this.lugar = navParams.data.lugar;
  }

  cancela() {
    this.viewCtrl.dismiss();
  }

}
