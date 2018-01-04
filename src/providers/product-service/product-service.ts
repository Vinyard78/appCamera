import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ProductServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductServiceProvider {

	constructor(public http: HttpClient) {

	}

  	getProductsFromPage(magNumber,page) {
    	return  this.http.get("http://34.248.114.48\:3000/api/products/?publication=" + magNumber + "&page=" + page);
	}

}
