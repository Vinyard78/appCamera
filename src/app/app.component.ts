import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProductServiceProvider } from '../providers/product-service/product-service';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  productsList: any[];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private inAppBrowser: InAppBrowser, private productService:ProductServiceProvider ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      setTimeout(()=>{
        splashScreen.hide();
      },100);
      productService.getProductsListFromStorage();
      setTimeout(
        ()=>{
          this.productsList = productService.productsList;
        },300
      );
    });
  }

  removeProductFromList(product){
    this.productService.removeFromProductsList(product);
  }

  openUrl(url):void {
    let browser = this.inAppBrowser.create(url);
    browser.show();
  }


}

