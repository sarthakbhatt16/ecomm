//Cart component.ts - Type Script file that contains code to render cart feature to elearning application

//including the required files and services
import { Component, OnInit, ViewContainerRef } from "@angular/core";

import { ModalDialogService, SimpleModalComponent } from 'ngx-modal-dialog';



import { environment } from "../../environments/environment";
import { DataService } from "../data.service";
import { RestApiService } from "../rest-api.service";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import {RequestDeliveryComponent} from "../request-delivery/request-delivery.component"
import { jsonpCallbackContext } from "@angular/common/http/src/module";

//componnet files specifications
@Component({
	selector: "app-cart",
	templateUrl: "./cart.component.html",
	styleUrls: ["./cart.component.scss"],
})

//exporting the cart component
export class CartComponent implements OnInit {
	btnDisabled = false;
	handler: any;

	quantities = [];
	numTest : any = "457874654464"

	getHeaders() {
		const token = localStorage.getItem("token");
		return token ? new HttpHeaders().set("Authorization", token) : null;
	}

	constructor(
		private data: DataService,
		private rest: RestApiService,
		private router: Router,
		private http: HttpClient,
		private modalService: ModalDialogService,
		private viewRef: ViewContainerRef	
	) { }

	trackByCartItems(index: number, item: any) {
		return item._id;
	}

	get cartItems() {
		return this.data.getCart();
	}

	get cartTotal() {
		let total = 0;
		this.cartItems.forEach((data, index) => {
			total += data["price"] * this.quantities[index];
		});
		return total;
	}

	removeProduct(index, product) {
		this.quantities.splice(index, 1);
		this.data.removeFromCart(product);
	}

	ngOnInit() {
		this.cartItems.forEach((data) => {
			this.quantities.push(1);
		});
		console.log("on init quantity array",this.cartItems, this.quantities);
		
	}

	validate() {
		if (!this.quantities.every((data) => data > 0)) {
			this.data.warning("Quantity cannot be less than one.");
		} else if (!localStorage.getItem("token")) {
			this.router.navigate(["/login"]).then(() => {
				this.data.warning("You need to login before making a purchase.");
			});
		// } else if (!this.data.user[""]) {
		// 	this.router.navigate(["/profile/settings"]).then(() => {
		// 		this.data.warning("You need to login before making a purchase.");
		// 	});
		} 
		else {
			this.data.message = "";
			return true;
		}
	}
	checkout() {
		//check for user login
		//check for contact number
		//


		for (let i = 0; i < this.cartItems.length; ++i) { // check if the ordered quantity is greater than the in stock qty
			if (this.cartItems[i].quantity - this.quantities[i] < 0) {
				alert(
					this.cartItems[i].title +
					" has " +
					this.cartItems[i].quantity +
					" items in stock"
				);
				return false;
			}
		}

		try {
			if (this.validate()) {
				let products;
				products = [];
				let displayArray = [];
				this.cartItems.forEach((d, index) => {
					console.log(d);
					products.push({
						product: d["_id"],
						quantity: this.quantities[index],
					});
					displayArray.push({
						name: d["title"],
						quantity: this.quantities[index]
					})
				});
				this.confirmDeliveryPresentModal(displayArray)
				console.log("products list", products);
				

			} else {
				this.btnDisabled = false;
			}
		} catch (error) {
			this.data.error(error);
		}
			
		
	}

	confirmDeliveryPresentModal(displayArray){
		console.log("display array string", displayArray, JSON.stringify(displayArray).toString());
		
		this.modalService.openDialog(this.viewRef,{
			title: 'Please confirm order',
			childComponent: RequestDeliveryComponent,
			  data: {
					//text: JSON.stringify(displayArray)
				text: 123,
				list: displayArray
				
			  },
			  actionButtons: [
				  { text: 'Change order', 
				  },
				  {
					  text: 'Change contact number', onAction:()=>{
						  location.href = `${this.data.clientURL}profile/settings`;
					  }
				  },
				  { text: 'Confirm', onAction: () => {
					  console.log("confirm clicked");
					  
				  } }
				]
			  
		  },
		  
		  );
	 

	}

	// confirmOrder(){

	// 	this.http
	// 	.post(
	// 		`${this.data.serverURL}api/payment`,
	// 		{
	// 			total: this.cartTotal,
	// 			products,
	// 			qty: this.quantities,
	// 		},
	// 		{
	// 			headers: this.getHeaders(),
	// 		}
	// 	)
	// 	.subscribe(
	// 		(val) => {
	// 			console.log("POST call successful value returned in body", val);
	// 		},
	// 		(response) => {
	// 			console.log("POST call in error", response);
	// 		},
	// 		() => {
	// 			console.log("The POST observable is now completed.");
	// 		}
	// 	);
	// }

	 async checkoutOne() {
		// await this.data.getProfile() // gt user information
		// console.log("data.user", this.data.user);
		// if(this.data.user == undefined || this.data.user == null || this.data.user.contactNumber == ""){ //check for login user
		// 	alert("please login or signup to request for delivery.")
		// }
		// const data = await this.rest.get(
		// 	`${this.data.serverURL}api/accounts/address` // check for empty address
		// );

		// if (JSON.stringify(data["address"]) === "{}" && this.data.message === "") {
		// 	alert(
		// 		"Shipping address is not entered in profile details. Please enter a shipping address" //display error message if address not found
		// 	);
		// 	location.href = `${this.data.clientURL}profile/address`;
		// 	return;
		// }

		for (let i = 0; i < this.cartItems.length; ++i) { // check if the ordered quantity is greater than the in stock qty
			if (this.cartItems[i].quantity - this.quantities[i] < 0) {
				alert(
					this.cartItems[i].title +
					" has " +
					this.cartItems[i].quantity +
					" items in stock"
				);
				return false;
			}
		}

		for (let i = 0; i < this.cartItems.length; ++i) { // subtract the ordered qty from the stock in the db
			this.http
				.post(
					`${this.data.serverURL}api/product/` + this.cartItems[i]._id + "/qty",
					{ qty: this.cartItems[i].quantity - this.quantities[i] }
				)
				.subscribe((val) => {
					console.log();
				});
		}

		this.btnDisabled = true; 
		try {
			if (this.validate()) {
				let products;
				products = [];
				this.cartItems.forEach((d, index) => {
					console.log(d);
					products.push({
						product: d["_id"],
						quantity: this.quantities[index],
					});
				});

				this.http
					.post(
						`${this.data.serverURL}api/payment`,
						{
							total: this.cartTotal,
							products,
							qty: this.quantities,
						},
						{
							headers: this.getHeaders(),
						}
					)
					.subscribe(
						(val) => {
							console.log("POST call successful value returned in body", val);
						},
						(response) => {
							console.log("POST call in error", response);
						},
						() => {
							console.log("The POST observable is now completed.");
						}
					);
			} else {
				this.btnDisabled = false;
			}
		} catch (error) {
			this.data.error(error);
		}
		this.data.clearCart();
		window.location.replace(`${this.data.clientURL}profile/orders`);
	 }
}
