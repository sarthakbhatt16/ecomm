//my-products component.ts - Type Script file that contains code to render products to elearning application

//including the required files and services
import { Component, OnInit } from "@angular/core";

import { RestApiService } from "../rest-api.service";
import { DataService } from "../data.service";

//component specific details
@Component({
	selector: "app-my-products",
	templateUrl: "./my-products.component.html",
	styleUrls: ["./my-products.component.scss"],
})

//exporting MyProductsComponents
export class MyProductsComponent implements OnInit {
	products: any;

	constructor(private data: DataService, private rest: RestApiService) { }

	async ngOnInit() {
		try {
			const data = await this.rest.get(
				`${this.data.serverURL}api/seller/products`
			);
			data["success"]
				? (this.products = data["products"])
				: this.data.error(data["message"]);
			console.log(data);
		} catch (error) {
			this.data.error(error["message"]);
		}
	}

	async deleteProduct(id) {
		//console.log("deleted the product", id);
		try {
			const data = await this.rest.post(
				`${this.data.serverURL}api/seller/products/` + id,
				{}
			);
			console.log(data);
			location.reload();
		} catch (error) {
			console.log(error);
		}
	}
}
