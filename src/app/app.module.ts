import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { CameraPreview } from '@ionic-native/camera-preview';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { NativeStorage } from '@ionic-native/native-storage';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { OnBoardingPage } from '../pages/on-boarding/on-boarding';

import { ProductServiceProvider } from '../providers/product-service/product-service';
import { AnimOnLoadDirective } from '../directives/animOnLoad.directive';
import { ProductModal } from '../modals/product.modal';
import { SafeUrlPipe } from '../pipes/safeUrlPipe';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    OnBoardingPage,
    AnimOnLoadDirective,
    ProductModal,
    SafeUrlPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    OnBoardingPage,
    ProductModal
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CameraPreview,
    InAppBrowser,
    NativeStorage,
    FileTransfer,
    File,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProductServiceProvider
  ]
})
export class AppModule {}
