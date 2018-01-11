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

	public productsList: any[];

	constructor(public http: HttpClient, private nativeStorage: NativeStorage) {
		this.productsList = [];
	}

  	getProductsFromPage(magNumber,page) {
    	return this.http.get("http://34.248.114.48\:3000/api/products/?publication=" + magNumber + "&page=" + page);
	}

	getProductsListFromStorage() {
		return this.nativeStorage.getItem('myProductsList')
		.then(
          (data) => {
            this.productsList = data; 
            console.log(data);
          },
          (error) => {
            console.error(error)
          }
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
		let isDouble: boolean = false;
		this.productsList.forEach((element, index)=>{
			if(element.id === product.id){
				isDouble = true;
			}
		});
		if(!isDouble){
			this.productsList.push(product);
			this.storeProductsList();
		}
	}

	removeFromProductsList(product){
		this.productsList.forEach((element, index)=>{
			if(element.id === product.id){
				this.productsList.splice(index,1);
				this.storeProductsList();
			}
		});
	}

	storeProductsList() {
		this.nativeStorage.setItem('myProductsList', this.productsList)
		.then(
	    	() => console.log('Stored item!'),
	    	error => console.error('Error storing item', error)
	  	);
	}

}
