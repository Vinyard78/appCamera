import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { ProductServiceProvider } from '../providers/product-service/product-service';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ToastController } from 'ionic-angular';

@Component({
	selector: 'product-modal',
  templateUrl: 'product.modal.html'
})
export class ProductModal {

  private product:any;

  constructor(
    private params: NavParams,
    private viewController: ViewController,
    private productService: ProductServiceProvider,
    private inAppBrowser: InAppBrowser,
    private toastController: ToastController
  ) {
    console.dir(this.params);
    this.product = this.params.data;
  }

  dismiss() {
    this.viewController.dismiss();
  }

  addProduct() {
    this.productService.pushInProductsList(this.product);
    this.presentToast();
  }

  openUrl(url):void {
    let browser = this.inAppBrowser.create(url);
    browser.show();
  }

  presentToast() {
    let toast = this.toastController.create({
      message: 'Votre produit a bien été ajouté dans la liste de course',
      duration: 3000
    });
    toast.present();
  }

}