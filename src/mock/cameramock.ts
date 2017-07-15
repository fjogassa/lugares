import { Camera } from '@ionic-native/camera';

export class CameraMock extends Camera {
    getPicture(options) {
        return new Promise((resolve, reject) => {
            resolve("http://animeinga.com.br/wp-content/uploads/2016/10/store_image_02_zpsau3elrkj.png");
        })
    }
}