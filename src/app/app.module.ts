import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AgmCoreModule } from "angular2-google-maps/core";
import { Geolocation } from "@ionic-native/geolocation";
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from "@ionic-native/camera";
import { File } from "@ionic-native/file";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AdicionaLugarPage } from '../pages/adiciona-lugar/adiciona-lugar';
import { ObtemLocalizacaoPage } from './../pages/obtem-localizacao/obtem-localizacao';
import { LugarPage } from './../pages/lugar/lugar';
import { CameraMock } from '../mock/cameramock';
import { LugaresService } from '../services/lugares';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LugarPage,
    AdicionaLugarPage,
    ObtemLocalizacaoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDG-rXF9dn44l6yaCBR7vjZ2Cr2WvYZNFI'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LugarPage,
    AdicionaLugarPage,
    ObtemLocalizacaoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    File,
    LugaresService,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Camera
    //{ provide: Camera, useClass: CameraMock }
  ]
})
export class AppModule { }
