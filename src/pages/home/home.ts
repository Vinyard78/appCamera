import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions } from '@ionic-native/camera-preview';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { ProductServiceProvider } from '../../providers/product-service/product-service';
import { ProductModal } from '../../modals/product.modal';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	private cameraPreviewOpts: CameraPreviewOptions; 
	private pictureOpts: CameraPreviewPictureOptions;
	private apiUrl: string;
	private fileUploadOptions: FileUploadOptions;
	private fileTransferObject: FileTransferObject;
	private picture: string;
	private animBlink: boolean;
	private appearBlink: boolean;
	private result: any;
	private url_quote: string;
	private journal_name: string;
	private page: string;
	private products: any;
	private showResult: boolean;
	private loader: any;
	private showSlides: boolean;
	private productModal: any;

	constructor(
		public navCtrl: NavController, 
		private cameraPreview: CameraPreview, 
		private fileTransfer: FileTransfer,
		private productService: ProductServiceProvider,
		private LoadingController: LoadingController,
		private alertController: AlertController,
		private modalController: ModalController
	) {}

	ionViewDidLoad() {

		this.animBlink = false;
		this.appearBlink = false;
		this.showResult = false;
		this.showSlides = false;
		this.productModal = ProductModal;

		this.initFileTransfer();

		this.initCameraPreview();

	};

	ionViewWillUnload() {
		this.cameraPreview.stopCamera();
	}

	initFileTransfer():void {
		this.apiUrl = encodeURI('http://visualbot.ai/api/visualsearch');

		this.fileUploadOptions = {
		    fileKey: 'file',
		    fileName: 'camerapreview',
		    chunkedMode: false,
		    mimeType: "image/jpeg",
		    headers: {}
		};

		this.fileTransferObject = this.fileTransfer.create();
	}

	initCameraPreview():void {
		this.cameraPreviewOpts = {
			x: 0,
			y: 0,
			width: window.screen.width,
			height: window.screen.height,
			camera: this.cameraPreview.CAMERA_DIRECTION.BACK,
			toBack: true
		};

		this.pictureOpts = {
			width: 640,
			height: 640,
			quality: 85
		};

		this.cameraPreview.setFlashMode(this.cameraPreview.FLASH_MODE.AUTO);

		this.cameraPreview.startCamera(this.cameraPreviewOpts).then(
			(res) => {
				console.log("startCameraSuccess: " + res)
			},
			(err) => {
				console.log("startCameraError: " + err);
			}
		);
	}

	uploadFile(file): void {

		this.fileTransferObject.upload(file, this.apiUrl, this.fileUploadOptions).then(
			// upload success
			(data) => {
				this.loader.dismiss();
				if(data.response && data.response !== "[]") {
					this.result = JSON.parse(data.response)[0];
					console.dir(this.result);

					if(this.result.summary.publication_id === 3075){
						this.url_quote = "http://34.248.114.48\:3000/" + this.result.summary.url_quote;
						this.journal_name = this.result.summary.journal_name;
						this.page = this.result.summary.page;
						this.getProducts(this.result.summary.publication_id, this.result.summary.page);
						this.showResult = true;
					} else {
						this.showAlert();
					}

				} else {
					this.showAlert();
				}
				
			}, 
			// upload fail
			(err) => {
				this.loader.dismiss();
				this.showAlert();
			    console.log("UploadFileError: " + err);
			}
		);
	}

	getProducts(magNum, page): void {
		this.productService.getProductsFromPage(magNum, page).subscribe((data)=>{
			this.products = data;
			setTimeout(()=>{
				this.showSlides = true;
			},500);
			console.dir(data);
		});
	}

	presentLoader():void {
		this.loader = this.LoadingController.create({
			content: "Recherche en cours",
			spinner:'dots',
			cssClass: 'theme-spinner'
	    });
		this.loader.present();
	}

	showAlert():void {
    	let alert = this.alertController.create({
      		title: 'Oops!',
      		subTitle: 'Désolé, nous ne reconnaissons pas ce produit.',
      		buttons: ['OK'],
      		cssClass: "camera-error-alert"
    	});
    	alert.present();
  	}

  	clear():void {
  		this.showResult = false;
  		this.showSlides = false;
  		this.url_quote = "";
  		this.journal_name = "";
  		this.page = "";
  		this.products = null;

  	}

  	openProduct():void {
	    let modal = this.modalController.create(this.productModal);
	    modal.present();
  	}

	takePicture(): void {
		if(this.showResult){
			this.clear();
		} else {
			// Effet de clignotement de l'ecran quand on prend une photo
			this.appearBlink = true;
			setTimeout(()=>{
				this.animBlink = true;
				setTimeout(()=>{
					this.animBlink = false;
					this.appearBlink = false;
				},200);
			},30);

			this.fileTransferObject.abort();
			this.cameraPreview.takePicture(this.pictureOpts).then((imageData) => {
				this.presentLoader();
				this.picture = 'data:image/jpeg;base64,' + imageData;
				this.uploadFile(this.picture);
			}, (err) => {
				console.log("CameraTakePictureError: " + err);
				this.showAlert();
			});
		}

	}

}