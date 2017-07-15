import { LugaresService } from './../../services/lugares';
import { Component } from '@angular/core';
import { ModalController, LoadingController, ToastController } from 'ionic-angular';
import { Localizacao } from '../../models/localizacao';
import { NgForm } from "@angular/forms";
import { Geolocation } from '@ionic-native/geolocation';
import { ObtemLocalizacaoPage } from '../obtem-localizacao/obtem-localizacao';
import { CameraOptions, Camera } from '@ionic-native/camera';

declare var cordova: any;

@Component({
  selector: 'page-adiciona-lugar',
  templateUrl: 'adiciona-lugar.html',
})
export class AdicionaLugarPage {

  localizacao: Localizacao = {
    lat: 40.7624324,
    lng: -73.9759827
  };
  localizacaoIsSet = false;
  imageUrl = '';

  constructor(private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private geolocation: Geolocation,
    private camera: Camera,
    private lugaresService: LugaresService) {
  }

  onSubmit(form: NgForm) {
    this.lugaresService
      .adicionaLugar(form.value.titulo, form.value.descricao, this.localizacao, this.imageUrl);
    form.reset();
    this.localizacao = {
      lat: 40.7624324,
      lng: -73.9759827
    };
    this.imageUrl = '';
    this.localizacaoIsSet = false;
  }


  localiza() {
    const loader = this.loadingCtrl.create({
      content: 'Obtendo a localização'
    });
    loader.present();
    this.geolocation.getCurrentPosition().then((respLocation) => {
      loader.dismiss();
      this.localizacao.lat = respLocation.coords.latitude;
      this.localizacao.lng = respLocation.coords.longitude;
      this.localizacaoIsSet = true;
    }).catch((error) => {
      loader.dismiss();
      const toast = this.toastCtrl.create({
        message: 'Não foi possível obter localização!',
        duration: 2500
      });
      toast.present();
    });
  }

  abreMapa() {
    const modal = this.modalCtrl.create(ObtemLocalizacaoPage,
      { localizacao: this.localizacao, isSet: this.localizacaoIsSet });

    modal.present();
    modal.onDidDismiss(
      data => {
        if (data) {
          this.localizacao = data.localizacao;
          this.localizacaoIsSet = true;
        }
      }
    );
  }

  tiraFoto() {

    const options: CameraOptions = {
      // http://ionicframework.com/docs/native/camera/
      quality: 75, // 75%
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      allowEdit: false,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: true,
    }

    this.camera.getPicture(options)
      .then(
      (pictureTaken) => {
        const base64Image = 'data:image/jpeg;base64,' + pictureTaken;
        const currentName = pictureTaken.replace(/^.*[\\\/]/, '');
        //const path = pictureTaken.replace(/[^\/]*$/, '');
        const newFileName = new Date().getUTCMilliseconds() + '.jpg';
        //console.log("Path: " + path);
        console.log("Nome atual: " + currentName);
        //console.log("ImageData: " + pictureTaken);
        //console.log("Nome nome: " + newFileName);
        //this.imageUrl = pictureTaken;
        this.imageUrl = 'data:image/png;base64,' + pictureTaken;
      }
      )
      .catch(
      err => {
        const toast = this.toastCtrl.create({
          message: 'Não foi possível obter foto. Tente novamente.',
          duration: 2500
        });
        toast.present();
      }
      );
  }
}
