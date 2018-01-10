import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';

/*
  Generated class for the ProductServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductServiceProvider {

	private productsList: any[];

	constructor(public http: HttpClient, private nativeStorage: NativeStorage) {
		this.productsList = [];
	}

  	getProductsFromPage(magNumber,page) {
    	return  this.http.get("http://34.248.114.48\:3000/api/products/?publication=" + magNumber + "&page=" + page);
	}

	getProductsList() {
		this.nativeStorage.getItem('myProductsList')
		  .then(
		    (data) => {
		    	this.productsList = data; 
		    	console.log(data);
		    },
		    error => console.error(error)
		  );
	}

	clearProductsList() {
		this.productsList.length = 0;
		this.nativeStorage.remove('myProductsList')
		  .then(
		    data => console.log(data),
		    error => console.error(error)
		  );
	}

	pushInProductsList(product:any){
		let param = {
			id : product.id,
			product : product
		};
		this.productsList.push(param);

		this.nativeStorage.setItem('myProductsList', this.productsList)
		  .then(
		    () => console.log('Stored item!'),
		    error => console.error('Error storing item', error)
		  );
	}

	removeFromProductsList(productId){
		let index = this.productsList.indexOf(productId);
		if(index !== -1){

		}
	}

}
